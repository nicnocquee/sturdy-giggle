require("../../src/server/db");
const post = require("micro-post");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const jwtKey = require("../../src/environment").jsonWebTokenSecret;

const handler = async (req, res) => {
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
        secure: require("../../src/environment").isProduction
      };
      if (remember) {
        cookieOptions.maxAge = 7 * 24 * 60 * 60;
      }

      const Session = require("../../src/server/models/session");
      var session = new Session({
        token
      });
      await session.save();

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
