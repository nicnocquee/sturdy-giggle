const jwtAuth = require("../../src/lib/micro-jwt-auth-cookie");

const jwtKey = process.env.JSON_WEB_TOKEN_KEY || "cat-30-ROCK¥";

const handler = (req, res) => {
  console.log("in /user");
  res.statusCode = 200;
  res.end(JSON.stringify(req.jwt));
};

export default jwtAuth(jwtKey)(handler);
