const genreService = require('../service/genre.service')

const genreResolver = {
    Query: {
        getAllGenres: async () => {
            return await genreService.getAll()
        }
    }
}

module.exports = genreResolver