const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type User {
    id: String
    username: String
    email: String
    password: String
  }

  input RegisterInput {
    email: String
    password: String
    username: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type UserPayload {
    token: String
    user: User
    success: Boolean
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    register(input: RegisterInput): UserPayload
    login(input: LoginInput): UserPayload
  }
`;

module.exports = typeDefs;
