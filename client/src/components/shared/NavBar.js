import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar bg='primary' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand href='/books'>Books</Navbar.Brand>
                <Nav className='me-auto'>
                    <Link to='/books' className='nav-link'>Books</Link>
                    <Link to='/authors' className='nav-link'>Authors</Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;