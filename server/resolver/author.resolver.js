const authorService = require('../service/author.service')

const authorResolver = {
    Query: {
        getAllAuthors: async () => {
            return await authorService.getAll()
        },
        getOneAuthor: async (parent, {id}) => {
            return await authorService.getOne(id)
        },
    },
    Mutation: {
        createAuthor: async (parent, {input}) => {
            return await authorService.create(input)
        },
        updateAuthor: async (parent, {input}) => {
            return await authorService.update(input)
        },
        deleteAuthor: async (parent, {id}) => {
            return await authorService.delete(id)
        }
    }
}

module.exports = authorResolver