import React, {useContext} from 'react';
import {Card} from 'react-bootstrap';
import AuthorDropdown from '../shared/AuthorDropdown';
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';

const AuthorFilterBar = observer(() => {
    const {bookContext} = useContext(Context)

    return (
        <Card
            className='mt-5 shadow-sm w-75 d-flex flex-column align-content-center align-items-center'
            style={{height: 100}}
        >
            <p className='mt-2 mb-2'>
                <b>Author</b>
            </p>
            <AuthorDropdown hasAny={true} context={bookContext}/>
        </Card>
    );
});

export default AuthorFilterBar;