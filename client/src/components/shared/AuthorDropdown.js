import React, {useContext, useEffect} from 'react';
import {Card, Dropdown} from 'react-bootstrap';
import {GET_ALL_AUTHORS} from '../../query/author';
import {useQuery} from '@apollo/client';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';

const AuthorDropdown = observer(({context, hasAny}) => {
    const {authorContext} = useContext(Context)
    const {data, loading, error} = useQuery(GET_ALL_AUTHORS);
    useEffect(() => {
        if (data) {
            authorContext.authors = data.getAllAuthors
        }
    }, [loading])

    return (
        <Dropdown className='mb-2'>
            <Dropdown.Toggle variant='outline-primary'>
                {context.author.id
                    ? context.author.firstName + ' '
                    + context.author.lastName
                    : (hasAny ? 'Any author' : 'Choose author')
                }
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {hasAny
                    ? <Dropdown.Item
                        onClick={() => context.author = {}}
                        key={-1}
                    >
                        {'Any author'}
                    </Dropdown.Item>
                    : <></>}
                {authorContext.authors.map(author =>
                    <Dropdown.Item
                        onClick={() => {
                            if (context.page) {
                                context.page = 1
                            }
                            context.author = {
                                id: author.id,
                                firstName: author.firstName,
                                lastName: author.lastName
                            }
                        }
                        }
                        key={author.id}
                    >
                        {author.firstName + ' ' + author.lastName}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default AuthorDropdown;