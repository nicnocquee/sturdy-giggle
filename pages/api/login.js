const post = require("micro-post");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const jwtKey = require("../../src/environment").default.jsonWebTokenSecret;

const handler = (req, res) => {
  const {
    body: { username, password, remember }
  } = req;

  if (username && password) {
    if (username === "admin" && password === "1234") {
      res.statusCode = 200;
      const token = jwt.sign({ user: { id: "1" } }, jwtKey);
      var cookieOptions = {
        path: "/",
        httpOnly: true,
        secure: require("../../src/environment").default.isProduction
      };
      if (remember) {
        cookieOptions.maxAge = 7 * 24 * 60 * 60;
      }
      const setCookie = cookie.serialize("_token", token, cookieOptions);
      res.setHeader("Set-Cookie", setCookie);
      return res.end(
        JSON.stringify({
          token
        })
      );
    }
  }
  res.end(
    JSON.stringify({
      error: {
        message: "Login failed"
      }
    })
  );
};

export default post(handler);
