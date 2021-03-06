const postsResolvers = require('./posts');
const usersresolvers = require('./users');

module.exports = {
    Query: {
        ...postsResolvers.Query
    }
}