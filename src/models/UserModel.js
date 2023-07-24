const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: "string",
      required: true,
      unique: true,
    },
    email: {
      type: "string",
      unique: true,
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = model("apollo_users", userSchema);
module.exports = UserModel;
