const bookResolver = require('./book.resolver');
const authorResolver = require('./author.resolver');
const genreResolver = require('./genre.resolver');
const userResolver = require('./user.resolver');
const GraphQLUpload = require('graphql-upload');


const resolver = {
    Upload: GraphQLUpload,
    Query: {
        ...bookResolver.Query,
        ...authorResolver.Query,
        ...genreResolver.Query,
        ...userResolver.Query
    },
    Mutation: {
        ...bookResolver.Mutation,
        ...authorResolver.Mutation,
        ...userResolver.Mutation
    }
}

module.exports = resolver