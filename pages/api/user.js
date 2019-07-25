const { guardAPIEndPoint } = require("../../src/lib/auth");

const handler = (req, res) => {
  console.log("in /user");
  res.statusCode = 200;
  res.end(JSON.stringify(req.jwt));
};

export default guardAPIEndPoint()(handler);
