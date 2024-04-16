const {buildSchema} = require('graphql')

const schema = buildSchema(`
    type Author {
        id: ID
        firstName: String
        lastName: String
        birthYear: Int
        books: [Book]
    }
    type Book {
        id: ID
        title: String
        publicationYear: Int
        language: String
        publicationHouse: String
        author: Author
        genre: Genre
    }
    type Genre {
        id: ID
        name: String
        books: [Book]
    }
    
    input AuthorInput {
        id: ID
        firstName: String
        lastName: String
        birthYear: Int
    }
    
    input BookInput {
        id: ID
        title: String
        publicationYear: Int
        language: String
        publicationHouse: String
        author: ID
        genre: ID
    }
    
    type Query {
        getAllBooks(genreId:ID, authorId: ID): [Book]
        getOneBook(id: ID): Book
      
        getAllAuthors(search: String): [Author]
        getOneAuthor(id: ID): Author
       
        getAllGenres: [Genre]
    }
    
    type Mutation {
        createBook(input: BookInput): Book
        updateBook(input: BookInput): Book
        deleteBook(id: ID): ID
        
        updateAuthor(input: AuthorInput): Author
        deleteAuthor(id: ID): ID
        createAuthor(input: AuthorInput): Author
    }
`)

module.exports = schema