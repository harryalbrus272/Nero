const { gql } = require("apollo-server");
const typeDefs = gql`
  type Posts {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment{
    id: ID!
    createdAt: String!
    body: String!
    username: String!
  }
  type Like{
    id: ID!
    createdAt: String!
    username:String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Posts]
    getPost(postId: ID!): Posts
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username:String!, password:String!): User!
    createPost(body:String!): Posts!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body:String!): Posts!
    deleteComment(postId: ID!, commentId: ID!): Posts!
    likePost(postId: ID!): Posts!
  }
  type Subscription{
    newPost: Posts!
  }
`;
module.exports = typeDefs;
