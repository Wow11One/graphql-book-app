import {gql} from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
       query Authors {
            getAllAuthors {
              id
              firstName
              lastName
            }
}
`