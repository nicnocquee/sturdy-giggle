import { compose } from "../../src/lib/util";
import { withDb } from "../../src/lib/db";

const { guardAPIEndPoint } = require("../../src/lib/auth");

const handler = (req, res, db) => {
  console.log("in /user");
  res.statusCode = 200;
  res.end(JSON.stringify(req.jwt));
};

export default compose(
  guardAPIEndPoint(),
  withDb()
)(handler);
