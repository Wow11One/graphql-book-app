import {AUTHORS_PAGE, BOOKS_PAGE, LOGIN_PAGE, REGISTRATION_PAGE} from './consts';
import Auth from '../pages/Auth';
import BooksList from '../pages/BooksList';
import AuthorsList from '../pages/AuthorsList';

export const routes = [
    {
        path: LOGIN_PAGE,
        Component: Auth
    },
    {
        path: REGISTRATION_PAGE,
        Component: Auth
    },
    {
        path: BOOKS_PAGE,
        Component: BooksList
    },
    {
        path: BOOKS_PAGE + '/:id',
        Component: BooksList
    },
    {
        path: AUTHORS_PAGE + '/:id',
        Component: AuthorsList
    },
]