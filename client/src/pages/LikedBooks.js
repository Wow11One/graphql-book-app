import React, {useEffect, useState} from 'react';
import {Card, Container} from 'react-bootstrap';
import {useQuery} from '@apollo/client';
import {GET_ALL_LIKED_BOOKS} from '../query/book';
import {useNavigate} from 'react-router';
import {BOOKS_PAGE} from '../utils/consts';

const LikedBooks = () => {
    const [likedBooks, setLikedBooks] = useState([]);
    const navigate = useNavigate();
    const {data, loading, error} = useQuery(GET_ALL_LIKED_BOOKS, {
        variables: {
            ids: JSON.parse(localStorage.getItem('likedBooks'))
        },
        fetchPolicy: 'no-cache'
    });
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('likedBooks')))
        if (data) {
            console.log(data.getAllBooks)
            setLikedBooks(data.getAllBooks.books)
        }
        if (error) {
            alert(error.message)
        }
    }, [loading])

    return (
        <Container className='mt-5'>
            <div className='d-flex justify-content-center align-items-center'>
                <h3>Liked books</h3>
            </div>
            {likedBooks.map(book =>
                <div className='d-flex justify-content-center w-auto mt-2'>
                    <Card
                        className='w-50'
                        onClick={() => navigate(BOOKS_PAGE + '/' + book.id)}
                    >
                        <Card.Body>
                            <p>
                                <b>{book.title}</b>
                            </p>
                            <p>{book.author.firstName + ' ' + book.author.lastName + ', ' + book.publicationYear}</p>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Container>
    );
};

export default LikedBooks;