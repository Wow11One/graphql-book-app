import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import {BOOKS_PAGE, SERVER_STATIC_URL} from '../../utils/consts';
import {useNavigate} from 'react-router';

const BookItem = ({book}) => {
    const {title, author, genre, image} = book;
    const navigate = useNavigate();
    const navigateToBookPage = (id) => navigate(BOOKS_PAGE + '/' + id);
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img
                variant='top'
                src={SERVER_STATIC_URL + (image || 'default.jpg')}
                onClick={() => navigateToBookPage(book.id)}
            />
            <Card.Body>
                <Card.Title
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                    onClick={() => navigateToBookPage(book.id)}
                >
                    {title}
                </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    Author: {author.firstName + ' ' + author.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                    Genre: {genre.name}
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default BookItem;