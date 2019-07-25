const jwtAuth = require("../../src/lib/micro-jwt-auth-cookie");
const cookie = require("cookie");
const post = require("micro-post");
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const jwtKey = process.env.JSON_WEB_TOKEN_KEY || "cat-30-ROCK¥";

const handler = (req, res) => {
  res.statusCode = 200;
  const setCookie = cookie.serialize("_token", "", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  });
  res.setHeader("Set-Cookie", setCookie);
  return res.end("Success");
};

export default compose(
  post,
  jwtAuth(jwtKey)
)(handler);
