const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./User/typesDefs");
const resolvers = require("./User/resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
