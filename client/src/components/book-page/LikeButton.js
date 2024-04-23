import React, {useContext, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';

const LikeButton = observer(({id, className}) => {
    const {bookPageContext} = useContext(Context);
    const isEmpty = () => {
        const likedBooks = JSON.parse(localStorage.getItem('likedBooks'));
        if (likedBooks && likedBooks.length !== 0) {
            return likedBooks
        }
        return null;
    };
    const addToLikedBooks = () => {
        const likedBooks = isEmpty();
        if (likedBooks) {
            if (isLiked()) {
                localStorage.setItem('likedBooks', JSON.stringify(likedBooks.filter(bookId => bookId !== id)));
                bookPageContext.isLiked = false
            } else {
                localStorage.setItem('likedBooks', JSON.stringify([...likedBooks, id]));
                bookPageContext.isLiked = true
            }
        } else {
            bookPageContext.isLiked = true
            localStorage.setItem('likedBooks', JSON.stringify([id]));
        }
    };

    const isLiked = () => {
        const likedBooks = isEmpty();
        if (likedBooks) {
            return likedBooks.includes(id);
        }
        return false;
    };

    useEffect(() => {
        bookPageContext.isLiked = isLiked()
    }, [])

    return (
        <Button
            variant={'outline-primary'}
            className={className}
            onClick={() => addToLikedBooks()}
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-suit-heart'
                viewBox='0 0 16 16'
            > {bookPageContext.isLiked
                ? <path
                    d='M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608
                    9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1'>
                </path>
                : <path
                    d='m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418
                    2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066
                    1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5
                    11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76
                    1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12
                    2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392
                    8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3
                    8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404
                    2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4
                    1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z'
                >
                </path>
            }
            </svg>
        </Button>
    );
});

export default LikeButton;