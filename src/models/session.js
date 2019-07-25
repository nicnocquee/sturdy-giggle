var mongoose = require("mongoose");

const definition = {
  token: String,
  createdAt: { type: Date, default: Date.now }
};

const SessionSchema = new mongoose.Schema(definition);
const SessionModel =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);

module.exports = exports = SessionModel;
