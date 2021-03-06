const { ApolloServer } = require("apollo-server");
const db = require("./config/mongoose");
const Post = require("./models/Post");

const typeDefs = require('./graphql/typedefs'); 
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`);
});
