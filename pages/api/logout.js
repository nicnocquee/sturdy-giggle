const cookie = require("cookie");
const post = require("micro-post");
const { guardAPIEndPoint } = require("../../src/lib/auth");

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const handler = (req, res) => {
  res.statusCode = 200;
  const setCookie = cookie.serialize("_token", "", {
    path: "/",
    httpOnly: true,
    secure: require("../../src/environment").default.isProduction
  });
  res.setHeader("Set-Cookie", setCookie);
  return res.end("Success");
};

export default compose(
  post,
  guardAPIEndPoint()
)(handler);
