import {gql} from '@apollo/client';

export const GET_ALL_BOOKS = gql`
       query Books($authorId: ID, $genreId: [ID], $search: String){
           getAllBooks(authorId: $authorId, genreId: $genreId, search: $search) {
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
            }
       }
`

export const GET_ONE_BOOK = gql`query bookQuery($id: ID) {
    getOneBook(id: $id) {
        id
        title
    }
}`