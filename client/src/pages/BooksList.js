import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../index';
import {useQuery} from '@apollo/client';
import {GET_ALL_BOOKS} from '../query/book';
import {observer} from 'mobx-react-lite';
import {Button, Col, Container, Row} from 'react-bootstrap';
import BookItem from '../components/book/BookItem';
import {useNavigate} from 'react-router';
import {BOOKS_PAGE} from '../utils/consts';
import BookModal from '../modals/BookModal';
import SearchBar from '../components/shared/SearchBar';
import AuthorFilterBar from '../components/book/AuthorFilterBar';
import GenreCheckButtons from '../components/shared/GenreCheckButtons';
import Pages from '../components/shared/Pages';

const BooksList = observer(() => {
    const {bookContext} = useContext(Context);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const {data, loading, error, refetch} = useQuery(GET_ALL_BOOKS, {
        variables: {
            genreIds: bookContext.selectedGenreIds,
            authorId: bookContext.author.id,
            search: bookContext.search,
            page: bookContext.page,
            limit: bookContext.limit
        }
    });

    useEffect(() => {
        if (data) {
            bookContext.books = data.getAllBooks.books
            bookContext.totalCount = data.getAllBooks.count
        }
    }, [data])

    useEffect(() => {
        refetch({
            variables: {
                genreIds: bookContext.selectedGenreIds,
                authorId: bookContext.author.id,
                search: bookContext.search,
                page: bookContext.page,
                limit: bookContext.limit
            },
            fetchPolicy: 'network-only'
        })
    }, [
        bookContext.search,
        bookContext.selectedGenreIds,
        bookContext.author,
        bookContext.page,
        bookContext.totalCount
    ]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Row className='mt-2 mb-5'>
                <Col md={3}>
                    <Row className='mt-4'>
                        <AuthorFilterBar/>
                        <GenreCheckButtons/>
                    </Row>
                </Col>
                <Col md={9}>
                    <Row className='mt-4 d-flex justify-content-between'>
                        <SearchBar context={bookContext}/>
                        <Button style={{width: 'auto'}}
                                variant='primary'
                                className='p-3 me-5'
                                onClick={handleShow}
                        >
                            Create book
                        </Button>
                    </Row>
                    <Row className='d-flex flex-row flex-wrap'>
                        {bookContext.books.map(book =>
                            <Col
                                md={4}
                                onClick={() => navigate(BOOKS_PAGE + '/' + book.id)}
                                key={book.id}
                                className='mt-3'
                            >
                                <BookItem
                                    book={book}
                                />
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
            <Pages context={bookContext}/>
            <BookModal show={show} onHide={handleClose} actionName={'Create'}/>
        </Container>
    );
});

export default BooksList;