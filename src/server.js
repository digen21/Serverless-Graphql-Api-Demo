const ApolloServer = require("apollo-server").ApolloServer;
const ApolloServerLambda = require("apollo-server-lambda").ApolloServer;
const schema = require("./graphql/schema");

function createLambdaServer() {
  return new ApolloServerLambda({
    schema,
    introspection: true,
    playground: true,
    context: ({ req }) => console.log("", req),
  });
}

function createLocalServer() {
  return new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: ({ req }) => ({
      user: req,
    }),
  });
}

module.exports = { createLambdaServer, createLocalServer };
