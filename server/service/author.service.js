const {Author, Book} = require("../models/models");
const {Op} = require("sequelize")

class AuthorService {

    async create({firstName, lastName, birthYear, country}) {
        const author = await Author.create({firstName, lastName, birthYear, country})

        return await this.getOne(author.id)
    }

    async getAll(search) {
        let queryParams = {}
        if (search) {
            search = '%' + search.trim() + '%'
            queryParams[Op.or] = [{firstName: {[Op.iLike]: search}}, {lastName: {[Op.iLike]: search}}]
        }
        const authors = await Author.findAll({where: queryParams})

        return authors
    }

    async getOne(id) {
        const author = await Author.findOne({where: {id}, include: {model: Book, as: 'books'}})

        return author
    }

    async update(input) {
        const author = await Author.findOne({where: {id: input.id}})
        await author.update(input)
        return await this.getOne(author.id)
    }

    async delete(id) {
        await Author.destroy({where: {id}})
        return id
    }

}

module.exports = new AuthorService()