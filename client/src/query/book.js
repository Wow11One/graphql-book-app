import {gql} from '@apollo/client';

export const GET_ALL_BOOKS = gql`
       query Books($authorId: ID, 
                   $genreIds: [ID], 
                   $search: String, 
                   $page: Int, 
                   $limit: Int) {
           getAllBooks(authorId: $authorId, 
                       genreIds: $genreIds, 
                       search: $search, 
                       page: $page, 
                       limit: $limit) {
                books {
                    id
                    title
                    genre {
                        name
                    }
                    author {
                        firstName
                        lastName
                    }
                    image
                }
                count
            }
       }
`

export const CREATE_BOOK = gql`
       mutation createBook($input: BookInput){
           createBook(input: $input) {
                id
            }
       }
`

export const UPDATE_BOOK = gql`
       mutation updateBook($input: BookInput){
           updateBook(input: $input) {
                id
                title
                genre {
                    id
                    name
                }
                author {
                    id
                    firstName
                    lastName
                }
                image
                publicationHouse
                publicationYear
                language
            }
       }
`

export const GET_ONE_BOOK = gql`query bookQuery($id: ID) {
    getOneBook(id: $id) {
         title
         publicationYear
         language
         publicationHouse
         image
         author {
         id
         firstName
         lastName
         }
         genre {
         id
         name
         }
    }
}`