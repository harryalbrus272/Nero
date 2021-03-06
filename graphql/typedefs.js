const { gql }= require('apollo-server');
const typeDefs = gql`
  type Posts {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Posts]
  }
`;
module.exports = typeDefs;