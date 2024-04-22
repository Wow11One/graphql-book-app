import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context';
import {BookStore} from './store/BookStore';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import {AuthorStore} from './store/AuthorStore';
import {BookFormStore} from './store/BookFormStore';

const httpLink = createUploadLink({
    uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});
const uploadLink = createUploadLink(
    {uri: 'http://localhost:5000'})

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink.concat(authLink)
});
export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ApolloProvider client={apolloClient}>
        <Context.Provider value={{
            bookContext: new BookStore(),
            authorContext: new AuthorStore(),
            bookFormContext: new BookFormStore()
        }}>
            <App/>
        </Context.Provider>
    </ApolloProvider>
);
