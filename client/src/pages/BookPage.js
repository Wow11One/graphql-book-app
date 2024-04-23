import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../index';
import {useParams} from 'react-router';
import {useQuery} from '@apollo/client';
import {GET_ONE_BOOK} from '../query/book';
import {Button, Container, Image} from 'react-bootstrap';
import {SERVER_STATIC_URL} from '../utils/consts';
import LikeButton from '../components/book-page/LikeButton';
import BookModal from '../modals/BookModal';

const BookPage = observer(() => {
    const {bookPageContext} = useContext(Context);
    const {id} = useParams();
    const [show, setShow] = useState(false);
    const {data, loading, error} = useQuery(GET_ONE_BOOK, {
        variables: {
            id
        }
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (data) {
            bookPageContext.title = data.getOneBook.title
            bookPageContext.publicationYear = data.getOneBook.publicationYear
            bookPageContext.publicationHouse = data.getOneBook.publicationHouse
            bookPageContext.language = data.getOneBook.language
            bookPageContext.image = data.getOneBook.image
            bookPageContext.author = data.getOneBook.author
            bookPageContext.genre = data.getOneBook.genre
            bookPageContext.id = data.getOneBook.id
        }
    }, [data]);

    return (
        <Container className='mt-5'>
            <div className='d-flex flex-row'>
                <div>
                    <Image
                        style={{
                            width: 'auto',
                            height: 'auto'
                        }}
                        src={SERVER_STATIC_URL + (bookPageContext.image || 'default.jpg')}
                        alt='book image'
                        rounded
                    />
                </div>
                <div className='d-flex flex-column w-100 me-3 ms-3'>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <h2>{bookPageContext.title}</h2>
                        <div className='d-flex flex-column'>
                            <Button
                                variant='primary'
                                onClick={handleShow}
                            >
                                Update
                            </Button>
                            <LikeButton id={id} className='mt-1'/>
                        </div>
                    </div>
                    <p style={{color: 'gray'}}>
                        {bookPageContext.author.firstName + ' ' + bookPageContext.author.lastName}
                    </p>
                    <dl className='mt-3'>
                        <dt>
                            Publication Year
                        </dt>
                        <dd>
                            {bookPageContext.publicationYear}
                        </dd>
                        <dt>
                            Publication house
                        </dt>
                        <dd>
                            {bookPageContext.publicationHouse}
                        </dd>
                        <dt>
                            Language
                        </dt>
                        <dd>
                            {bookPageContext.language}
                        </dd>
                        <dt>
                            Genre
                        </dt>
                        <dd>
                            {bookPageContext.genre.name}
                        </dd>
                    </dl>
                </div>
            </div>
            <BookModal show={show} onHide={handleClose} id={id} actionName={'Update'}/>
        </Container>
    );
});

export default BookPage;