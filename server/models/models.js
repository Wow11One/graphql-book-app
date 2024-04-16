const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Author = sequelize.define('authors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    birthYear: {type: DataTypes.INTEGER, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
})

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    publicationYear: {type: DataTypes.INTEGER, allowNull: false},
    language: {type: DataTypes.STRING, allowNull: false},
    publicationHouse: {type: DataTypes.STRING, allowNull: false}
})

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

Author.hasMany(Book, {onDelete: 'CASCADE', as: 'books'})
Book.belongsTo(Author)

Genre.hasMany(Book, {onDelete: 'CASCADE', as: 'books'})
Book.belongsTo(Genre)


module.exports = {
    Author,
    Book,
    Genre
}