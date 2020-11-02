import React from 'react';
import AuthenticationButton from '../Auth0/AuthenticationButton';
import SignupButton from '../Auth0/SignUpButton';

const Home = () => {
    return (
        <>
            <h1>Book Club App</h1>
            
            <AuthenticationButton />
            <SignupButton />
        </>
    )
};

export default Home;