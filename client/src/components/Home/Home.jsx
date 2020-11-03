import React from 'react';
import AuthenticationButton from '../Auth0/AuthenticationButton';
import SignupButton from '../Auth0/SignUpButton';

const Home = () => {
    return (
        <>
            <br />
            <AuthenticationButton />
            <SignupButton />
        </>
    )
};

export default Home;