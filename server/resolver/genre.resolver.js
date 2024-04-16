const genreService = require('../service/genre.service')

const genreResolver = {
    getAllGenres: async () => {
        return await genreService.getAll()
    }
}

module.exports = genreResolver