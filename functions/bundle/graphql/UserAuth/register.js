const bcrypt = require("bcrypt");
const { ApolloError } = require("apollo-server");
const UserModel = require("../../models/UserModel");

const Register = async (response) => {
  try {
    const { email, password, username } = response;

    let user = await UserModel.findOne({ email });
    if (user) {
      throw new ApolloError("User Already Exists With This Email...");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const values = {
      email,
      username,
      password: hashPassword,
    };
    user = await UserModel.create(values);

    if (user) {
      return {
        user: user,
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    throw new ApolloError(error);
  }
};

module.exports = Register;
