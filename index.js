const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
//exclamation for required
const typeDefs = gql`
    type Query{
        sayHi : String
    }`
const resolvers = {
    Query : {
        sayHi : () => 'Hello World!'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

HJiuwiiYtU9vsJR

server.listen({port : 5000}).then(res => {
    console.log(`Server running at ${res.url}`);
})