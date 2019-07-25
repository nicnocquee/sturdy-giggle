require("../../src/lib/db");

const cookie = require("cookie");
const post = require("micro-post");
const { guardAPIEndPoint } = require("../../src/lib/auth");

const { compose } = require("../../src/lib/util");

const handler = async (req, res) => {
  res.statusCode = 200;
  const token = req.cookies._token;

  const Session = require("../../src/models/session");
  await Session.findOneAndRemove({ token });

  const setCookie = cookie.serialize("_token", "", {
    path: "/",
    httpOnly: true,
    secure: require("../../src/environment").isProduction
  });
  res.setHeader("Set-Cookie", setCookie);

  return res.end("Success");
};

export default compose(
  post,
  guardAPIEndPoint()
)(handler);
