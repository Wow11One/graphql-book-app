import React, {useContext, useEffect} from 'react';
import {Card, Dropdown} from 'react-bootstrap';
import {GET_ALL_AUTHORS} from '../../query/author';
import {useQuery} from '@apollo/client';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';
import {GET_ALL_GENRES} from '../../query/genre';

const GenreDropdown = observer(() => {
    const {bookContext, bookFormContext} = useContext(Context)
    const {data, loading, error} = useQuery(GET_ALL_GENRES);
    useEffect(() => {
        if (data) {
            console.log(data.getAllGenres)
            bookContext.genres = data.getAllGenres
        }
    }, [loading])

    return (
        <Dropdown className='mb-2'>
            <Dropdown.Toggle variant='outline-primary'>
                {bookFormContext.genre.name || 'chose genre'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {bookContext.genres.map(genre =>
                    <Dropdown.Item
                        onClick={() =>
                            bookFormContext.genre = {
                                id: genre.id,
                                name: genre.name
                            }
                        }
                        key={genre.id}
                    >
                        {genre.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default GenreDropdown;