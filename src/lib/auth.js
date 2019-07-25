const jwtKey = process.env.JSON_WEB_TOKEN_KEY || "cat-30-ROCK¥";

const publicPages = ["/login"];

/**
 * If the page is not in the list of publicPages and the user is not authenticated, redirect to /login page.
 * The user is authenticated if there is a valid jwt token in the cookie in the request.
 */
export const auth = ({ req, res, router }) => {
  if (req) {
    var shouldRedirect = false;
    if (publicPages.indexOf(router.pathname) === -1) {
      const jwt = eval("require('jsonwebtoken')");
      const { parse: cookieParser } = eval("require('cookie')");
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
