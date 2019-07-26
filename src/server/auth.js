require("./db");

const jwt = require("jsonwebtoken");
const { parse: cookieParser } = require("cookie");

const jwtKey = require("../environment").jsonWebTokenSecret;

const publicPages = ["/login"];

/**
 * If the page is not in the list of publicPages and the user is not authenticated, redirect to /login page.
 * The user is authenticated if there is a valid jwt token in the cookie in the request.
 * If jwt is valid, return the user.
 */
export const guardPage = async ({ req, res, router }) => {
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
            const Session = require("./models/session");
            const savedToken = await Session.findOne({ token: _token });
            if (!savedToken) {
              shouldRedirect = true;
            } else {
              const decoded = jwt.verify(_token, jwtKey);
              return decoded.user;
            }
          } catch (error) {
            shouldRedirect = true;
          }
        }
      }
    }

    var redirectTo = req.url;
    if ((redirectTo = "/logout")) {
      redirectTo = "/";
    }
    if (shouldRedirect) {
      res.writeHead(302, {
        Location: `/login?redirect=${redirectTo}`
      });
      res.end();
    }
  }
};

/**
 * Guard an API End Point by checking if the request comes with the _token in the cookie
 */
export const guardAPIEndPoint = () => fn => {
  return async (req, res) => {
    const bearerToken = req.cookies._token;

    if (!bearerToken) {
      res.writeHead(401);
      res.end("missing token");
      return;
    }

    try {
      const decoded = jwt.verify(bearerToken, jwtKey);

      const Session = require("./models/session");
      const savedToken = await Session.findOne({ token: decoded });
      if (!savedToken) {
        res.writeHead(401);
        res.end("token not valid");
        return;
      }
      req.jwt = decoded;
    } catch (err) {
      res.writeHead(401);
      res.end("invalid token");
      return;
    }

    return fn(req, res);
  };
};
