const { ApolloServer, PubSub } = require("apollo-server");
const db = require("./config/mongoose");
const Post = require("./models/Post");

const typeDefs = require('./graphql/typedefs'); 
const resolvers = require('./graphql/resolvers');
//Publish Subscribers
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) =>({ req,pubsub })
});

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`);
});
