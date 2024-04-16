const {Book, Author, Genre} = require("../models/models");

class BookService {

    async create({title, publicationYear, language, publicationHouse, author, genre}) {
        const book = await Book.create({
            title,
            publicationYear,
            language,
            publicationHouse,
            authorId: author,
            genreId: genre
        })

        return await this.getOne(book.id)
    }

    async getAll({genreId, authorId}) {
        let queryParams = {}
        if (genreId) {
            queryParams = {...queryParams, genreId}
        }
        if (authorId) {
            queryParams = {...queryParams, authorId}
        }

        const books = await Book.findAll({
            where: queryParams,
            include: [{model: Author, as: 'author'}, {model: Genre, as: 'genre'}]
        })

        return books
    }

    async getOne(id) {
        const book = await Book.findOne({
            where: {id},
            include: [{model: Author, as: 'author'}, {model: Genre, as: 'genre'}]
        })

        return book
    }

    async update(input) {
        const book = await Book.findOne({where: {id: input.id}})
        if (input.author) {
            input.authorId = input.author
        }
        if (input.genre) {
            input.genreId = input.genre
        }

        await book.update(input)
        return await this.getOne(book.id)
    }

    async delete(id) {
        await Book.destroy({where: {id}})
        return id
    }

}

module.exports = new BookService()