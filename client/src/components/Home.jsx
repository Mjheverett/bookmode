import React from 'react'
import AuthenticationButton from './AuthenticationButton';
import SignupButton from './SignUpButton';

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