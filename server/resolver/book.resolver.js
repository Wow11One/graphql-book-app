const bookService = require('../service/book.service')

const bookResolver = {
    Query: {
        getAllBooks: async (parent, args) => {
            return await bookService.getAll(args)
        },
        getOneBook: async (parent, {id}) => {
            return await bookService.getOne(id)
        }
    },
    Mutation: {
        createBook: async (parent, {input}) => {
            console.log('hello');
            return await bookService.create(input)
        },
        updateBook: async (parent, {input}) => {
            return await bookService.update(input)
        },
        deleteBook: async (parent, {id}) => {
            return await bookService.delete(id)
        }
    }
}

module.exports = bookResolver