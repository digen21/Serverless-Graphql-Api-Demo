const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server");
const UserModel = require("../../models/UserModel");

const { EXPIRY_TIME, JWT_TOKEN } = process.env;

const Login = async (response) => {
  try {
    const { email, password } = response;
    let user = await UserModel.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user_id: user.id }, JWT_TOKEN, {
        expiresIn: EXPIRY_TIME,
      });
      return {
        user: user,
        token: token,
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    throw new ApolloError(error);
  }
};

module.exports = Login;
