const {Book, Author, Genre} = require("../models/models");
const fs = require('fs');
const uuid = require('uuid')
const {Op} = require('sequelize');

const saveImage = async (image) => {
    const {createReadStream} = await image;

    const stream = createReadStream();
    let newFileName = uuid.v4() + ".jpg";
    await stream.pipe(fs.createWriteStream('./public/images/' + newFileName, {
        flags: 'w+'
    }));

    return newFileName
}

class BookService {

    async create({title, publicationYear, language, publicationHouse, author, genre, image}) {
        image = await saveImage(image)
        const book = await Book.create({
            title,
            publicationYear,
            language,
            publicationHouse,
            authorId: author,
            genreId: genre,
            image
        });

        return await this.getOne(book.id);
    }

    async getAll({genreIds, authorId, search, limit, page}) {
        let queryParams = {}
        let genreParams = {}
        let paginationParams = {}
        if (genreIds && genreIds.length !== 0) {
            console.log(genreParams)
            genreParams = {...genreParams, where: {id: genreIds}}
        }
        if (authorId) {
            queryParams = {...queryParams, authorId}
        }
        if (search || search.trim().length !== 0) {
            search = '%' + search.trim() + '%'
            queryParams.title = {[Op.iLike]: search}
        }
        if (limit) {
            let offset = limit * (page - 1)
            paginationParams = {offset, limit}
        }

        const books = await Book.findAndCountAll({
            ...paginationParams,
            where: queryParams,
            include: [{model: Author, as: 'author'}, {model: Genre, as: 'genre', ...genreParams}],
            order: [['createdAt', 'asc']]
        })

        return {books: books.rows, count: books.count}
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
        if (input.image) {
            input.image = await saveImage(input.image)
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