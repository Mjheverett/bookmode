import React from 'react'
import { Link } from 'react-router-dom';
import AuthenticationButton from './Auth0/AuthenticationButton';
import SignupButton from './Auth0/SignUpButton';

// Imports for Page Layout
import { Container } from '@material-ui/core';

// Styled components for all CSS


const Home = () => {
    return (
        <>
        <Container >
            <h1>Book Club App</h1>
            
            <AuthenticationButton />
            <SignupButton />
        </Container>
        </>
    )
};

export default Home;