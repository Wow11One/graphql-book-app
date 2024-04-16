const {Genre, Book} = require("../models/models");

class GenreService {
    async getAll() {
        const genres = await Genre.findAll({include: {model: Book, as: 'books'}})

        return genres
    }
}

module.exports = new GenreService()