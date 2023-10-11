import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { API_URL } from '../../config';
import { useSelector } from 'react-redux';
import Logout from '../pages/Logout';

const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/user`, {
                    credentials: 'include',
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
            }
        };

        checkAuthStatus();
    }, [user]);

    return (
        <Navbar
            style={{ backgroundColor: 'orange' }}
            variant="dark"
            expand="sm"
            className="justify-content-between mt-2 mb-1 rounded px-5"
        >
            <Nav>
                <Nav.Link as={NavLink} to="/">HOME</Nav.Link>
            </Nav>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav>
                    {isAuthenticated ? (
                        <NavDropdown title="My Account" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <Logout />
                        </NavDropdown>
                    ) : (
                        <>
                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
