import React, {useContext, useEffect} from 'react';
import {Card, FormCheck} from 'react-bootstrap';
import {GET_ALL_GENRES} from '../../query/genre';
import {useQuery} from '@apollo/client';
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';

const GenreCheckButtons = observer(() => {
    const {data, loading, error} = useQuery(GET_ALL_GENRES);
    const {bookContext} = useContext(Context)

    useEffect(() => {
        if (data) {
            bookContext.genres = data.getAllGenres
        }
    }, [loading]);

    const onChangeHandler = (id) => {
        bookContext.page = 1
        if (bookContext.selectedGenreIds.includes(id)) {
            bookContext.selectedGenreIds = bookContext.selectedGenreIds.filter(genreId => genreId !== id);
        } else {
            bookContext.selectedGenreIds = [...bookContext.selectedGenreIds, id]
        }
    };

    return (
        <Card
            className='mt-5 shadow-sm w-75 d-flex flex-column align-content-center align-items-center'
        >
            <p className='mt-2 mb-2'>
                <b>Genres</b>
            </p>
            <div className='mb-2'>
                {bookContext.genres.map(genre =>
                    <FormCheck
                        style={{width: 'auto'}}
                        label={genre.name}
                        name="group1"
                        key={genre.id}
                        checked={bookContext.selectedGenreIds.includes(genre.id)}
                        onChange={() => onChangeHandler(genre.id)}
                    />)
                }
            </div>
        </Card>
    );
});

export default GenreCheckButtons;