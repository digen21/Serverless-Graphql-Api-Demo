const UserModel = require("../../models/UserModel");
const Login = require("../UserAuth/login");
const Register = require("../UserAuth/register");

const resolvers = {
  Query: {
    currentUser: async (_, __, { user }) => {
      console.log("", user);
      const response = await UserModel.findById(user);
      return response;
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      const response = await Register(input);
      return response;
    },

    login: async (_, { input }) => {
      const response = await Login(input);
      return response;
    },
  },
};

module.exports = resolvers;
