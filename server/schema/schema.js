const {buildSchema} = require('graphql')

const schema = `#graphql
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
        image: String
    }
    
    type BookCount {
        books: [Book]
        count: Int
    }
    
    type Genre {
        id: ID
        name: String
        books: [Book]
    }
    
    type User {
        id: ID
        username: String
        password: String
    }
    type Token {
        token: String
    }
    
    input AuthorInput {
        id: ID
        firstName: String
        lastName: String
        birthYear: Int
    }
    
    scalar Upload
    
    input BookInput {
        id: ID
        title: String
        publicationYear: Int
        language: String
        publicationHouse: String
        image: Upload
        author: ID
        genre: ID
    }
    
    type Query {
        getAllBooks(genreIds: [ID], authorId: ID, search: String, page: Int, limit: Int): BookCount
        getOneBook(id: ID): Book
      
        getAllAuthors(search: String): [Author]
        getOneAuthor(id: ID): Author
       
        getAllGenres: [Genre]
        check: Boolean
        login(username: String!, password: String!): Token
    }
    
    type File {
        url: String!
    }
    
    type Mutation {
        createBook(input: BookInput): Book
        updateBook(input: BookInput): Book
        deleteBook(id: ID): ID
        
        updateAuthor(input: AuthorInput): Author
        deleteAuthor(id: ID): ID
        createAuthor(input: AuthorInput): Author
        
        registration(username: String!, password: String!): Token
    }
`

module.exports = schema