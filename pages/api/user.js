import { compose } from "../../src/lib/util";
import { withDb } from "../../src/server/db";

const { guardAPIEndPoint } = require("../../src/server/auth");

const handler = (req, res, db) => {
  console.log("in /user");
  res.statusCode = 200;
  res.end(JSON.stringify(req.jwt));
};

export default compose(
  guardAPIEndPoint(),
  withDb()
)(handler);
