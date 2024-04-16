const bookService = require('../service/book.service')

const bookResolver = {
    createBook: async ({input}) => {
        return await bookService.create(input)
    },
    getAllBooks: async ({genreId, authorId}) => {
        return await bookService.getAll({genreId, authorId})
    },
    getOneBook: async ({id}) => {
        return await bookService.getOne(id)
    },
    updateBook: async ({input}) => {
        return await bookService.update(input)
    },
    deleteBook: async ({id}) => {
        return await bookService.delete(id)
    }
}

module.exports = bookResolver