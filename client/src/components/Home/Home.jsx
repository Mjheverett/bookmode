import React, { useEffect } from 'react';
import AuthenticationButton from '../Auth0/AuthenticationButton';
import SignupButton from '../Auth0/SignUpButton';

import { Container, Grid, Typography } from '@material-ui/core';
import './Graphic.css';

import storage from 'local-storage-fallback';

const savedTheme = JSON.parse(storage.getItem('theme'));
console.log("initial theme is:", savedTheme.mode)


const Home = () => {
    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid>
                        <Typography variant="h2">for book enthusiasts</Typography>
                        <Typography variant="h6">a niche social app that is private, simple, and efficienct.</Typography>
                        <br />
                        <AuthenticationButton />
                        <SignupButton />
                    </Grid>
                    <Grid >
                        <br />
                        {/* Hero Graphic */}
                        <div className="shapeshifter play" />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
};

export default Home;