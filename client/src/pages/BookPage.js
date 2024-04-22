import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../index';
import {Col} from 'react-bootstrap';
import BookItem from '../components/book/BookItem';

const BookPage = observer(() => {
    const {bookContext} = useContext(Context)

    return (
        <div>
        </div>
    );
});

export default BookPage;