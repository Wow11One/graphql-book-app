const bookResolver = require('./book.resolver')
const authorResolver = require('./author.resolver')
const genreResolver = require('./genre.resolver')

const resolver = {
    ...bookResolver,
    ...authorResolver,
    ...genreResolver
}

module.exports = resolver