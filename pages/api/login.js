const post = require("micro-post");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const jwtKey = process.env.JSON_WEB_TOKEN_KEY || "cat-30-ROCK¥";

const handler = (req, res) => {
  const {
    body: { username, password }
  } = req;

  if (username && password) {
    if (username === "admin" && password === "1234") {
      res.statusCode = 200;
      const token = jwt.sign({ user: { id: "1" } }, jwtKey);
      const setCookie = cookie.serialize("_token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });
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
