import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import {SERVER_STATIC_URL} from '../../utils/consts';

const BookItem = ({book}) => {
    const {title, author, genre, image} = book
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img
                variant="top"
                src={SERVER_STATIC_URL + (image || 'default.jpg')}
            />
            <Card.Body>
                <Card.Title style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
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