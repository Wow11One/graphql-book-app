import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {useMutation, useQuery} from '@apollo/client';
import {CREATE_BOOK, GET_ALL_BOOKS, GET_ONE_BOOK} from '../query/book';
import AuthorDropdown from '../components/shared/AuthorDropdown';
import {observer} from 'mobx-react-lite';
import {Context} from '../index';
import GenreDropdown from '../components/shared/GenreDropdown';

const BookModal = observer(({show, onHide, actionName}) => {
    const {bookFormContext, bookContext} = useContext(Context)
    const [validated, setValidated] = useState(false)

    const [createBook] = useMutation(CREATE_BOOK, {
        onCompleted: data => console.log(data),
        onError: error => alert(error.message),
        refetchQueries: [
            {
                query: GET_ALL_BOOKS,
                variables: {
                    genreIds: bookContext.genreIds,
                    authorId: bookContext.author.id,
                    search: bookContext.search
                }
            }
        ]
    })

    const [updateBook] = useMutation(CREATE_BOOK, {
        onCompleted: data => console.log(data),
        onError: error => alert(error.message),
        refetchQueries: [
            {
                query: GET_ALL_BOOKS,
                variables: {
                    genreIds: bookContext.genreIds,
                    authorId: bookContext.author.id,
                    search: bookContext.search
                }
            }
        ]
    })
    const {data, loading, error} = useQuery(GET_ONE_BOOK, {
        variables: {id: bookFormContext.id}
    })

    useEffect(() => {
        if (actionName === 'Update' && data.getOneBook) {
            bookFormContext.title = data.getOneBook.title;
            bookFormContext.language = data.getOneBook.language;
            bookFormContext.publicationYear = data.getOneBook.publicationYear;
            bookFormContext.publicationHouse = data.getOneBook.publicationHouse;
            bookFormContext.author = data.getOneBook.author;
            bookFormContext.genre = data.getOneBook.genre;
        } else {
            bookFormContext.init()
        }
    }, [show, loading])
    const create = () => {
        createBook({
            variables: {
                input: {
                    image: bookFormContext.image,
                    title: bookFormContext.title,
                    publicationHouse: bookFormContext.publicationHouse,
                    publicationYear: bookFormContext.publicationYear,
                    language: bookFormContext.language,
                    author: bookFormContext.author.id,
                    genre: bookFormContext.genre.id
                }
            }
        }).then(r => console.log(r))
    }
    const update = () => {
        updateBook({
            variables: {
                input: {
                    image: bookFormContext.image,
                    title: bookFormContext.title,
                    publicationHouse: bookFormContext.publicationHouse,
                    publicationYear: bookFormContext.publicationYear,
                    language: bookFormContext.language,
                    author: bookFormContext.author.id,
                    genre: bookFormContext.genre.id
                }
            }
        }).then(r => console.log(r))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false ||
            !bookFormContext.genre.id ||
            !bookFormContext.author.id) {
            alert('not correct data');
            setValidated(true);
        } else {
            actionName === 'Create' ? create() : update();
            onHide()
            setValidated(false);
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{actionName + ' book'}</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>
                            Author
                        </Form.Label>
                        <AuthorDropdown context={bookFormContext}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Genre
                        </Form.Label>
                        <GenreDropdown/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control
                            type='text'
                            value={bookFormContext.title}
                            onChange={e => bookFormContext.title = e.target.value}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Title is required
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Publication Year
                        </Form.Label>
                        <Form.Control
                            type='number'
                            min={1800}
                            max={2025}
                            value={bookFormContext.publicationYear}
                            onChange={e => bookFormContext.publicationYear = e.target.value}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Publication Year is not correct
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Language
                        </Form.Label>
                        <Form.Control
                            type='text'
                            value={bookFormContext.language}
                            onChange={e => bookFormContext.language = e.target.value}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Language is required
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Publication House
                        </Form.Label>
                        <Form.Control
                            type='text'
                            value={bookFormContext.publicationHouse}
                            onChange={e => bookFormContext.publicationHouse = e.target.value}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            Publication House is required
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Image
                        </Form.Label>
                        <Form.Control
                            type='file'
                            onChange={e => {
                                bookFormContext.image = e.target.files[0]
                            }}
                            required={actionName === 'Create'}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Image is required
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onHide}>
                        Close
                    </Button>
                    <Button variant='primary' type='submit'>
                        {actionName}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
});

export default BookModal;