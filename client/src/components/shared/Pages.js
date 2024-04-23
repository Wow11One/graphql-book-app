import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(({context}) => {
    const pageCount = Math.ceil(context.totalCount / context.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <Pagination className='d-flex justify-content-end me-5 mt-2'>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={context.page === page}
                    onClick={() => context.page = page}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    )
})

export default Pages;