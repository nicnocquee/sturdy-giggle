var mongoose = require("mongoose");

const definition = {
  name: String,
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
};

const UserSchema = new mongoose.Schema(definition);
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
