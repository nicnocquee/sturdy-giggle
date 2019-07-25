const jwt = require("jsonwebtoken");
const { parse: cookieParser } = require("cookie");

const jwtKey = require("../environment").default.jsonWebTokenSecret;

const publicPages = ["/login"];

/**
 * If the page is not in the list of publicPages and the user is not authenticated, redirect to /login page.
 * The user is authenticated if there is a valid jwt token in the cookie in the request.
 * If jwt is valid, return the user.
 */
export const guardPage = ({ req, res, router }) => {
  if (req) {
    var shouldRedirect = false;
    if (publicPages.indexOf(router.pathname) === -1) {
      const { cookie } = req.headers;
      if (!cookie) {
        shouldRedirect = true;
      }
      if (cookie) {
        const cookies = cookieParser(cookie);
        const { _token } = cookies;
        if (!_token) {
          shouldRedirect = true;
        } else {
          try {
            const decoded = jwt.verify(_token, jwtKey);
            return decoded.user;
          } catch (error) {
            shouldRedirect = true;
          }
        }
      }
    }

    if (shouldRedirect) {
      res.writeHead(302, {
        Location: `/login?redirect=${req.url}`
      });
      res.end();
    }
  }
};

export const guardAPIEndPoint = () => fn => {
  return (req, res) => {
    const bearerToken = req.cookies._token;

    if (!bearerToken) {
      res.writeHead(401);
      res.end("missing token");
      return;
    }

    try {
      req.jwt = jwt.verify(bearerToken, jwtKey);
    } catch (err) {
      res.writeHead(401);
      res.end("invalid token");
      return;
    }

    return fn(req, res);
  };
};
