import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap'

const NavBar = () => {
    return (
        <Navbar bg='primary' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand href='/books'>Navbar</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href='/books'>Books</Nav.Link>
                    <Nav.Link href='/authors'>Authors</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;