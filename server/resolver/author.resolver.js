const authorService = require('../service/author.service')

const resolver = {
    createAuthor: async ({input}) => {
        return await authorService.create(input)
    },
    getAllAuthors: async () => {
        return await authorService.getAll()
    },
    getOneAuthor: async ({id}) => {
        return await authorService.getOne(id)
    },
    updateAuthor: async ({input}) => {
        return await authorService.update(input)
    },
    deleteAuthor: async ({id}) => {
        return await authorService.delete(id)
    }
}

module.exports = resolver