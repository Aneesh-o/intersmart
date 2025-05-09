import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const signOut = async (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <>
            <Navbar expand="lg" className="py-3" style={{ backgroundColor: '#0A3321', color: 'white' }}>
                <Container>
                    <Navbar.Brand href="/" className="text-white fw-bold fs-4">
                        <span className="position-relative">
                            Job Board<span className="position-absolute" style={{ color: '#c0f953', fontSize: '1.5rem', top: '-5px', left: '0' }}>•</span> Application
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to="/Home" className="text-white mx-2">Home</Nav.Link>
                            <Nav.Link as={Link} to="/AppliedUsers" className="text-white mx-2">Applied Candidates</Nav.Link>
                            <Nav.Link as={Link} to="/Profile" className="text-white mx-2">Profile</Nav.Link>
                        </Nav>
                        {
                            isLoggedIn ?
                                <Button onClick={signOut} variant="outline-light" className="rounded-pill px-4 d-flex align-items-center">
                                    Sign out
                                </Button>
                                :
                                <Link style={{ textDecoration: "none" }} to={'/Login'}><Button variant="outline-light" className="rounded-pill px-4 d-flex align-items-center">
                                    Sign Up
                                </Button></Link>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
