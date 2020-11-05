import React from 'react';
import AuthenticationButton from '../Auth0/AuthenticationButton';
import SignupButton from '../Auth0/SignUpButton';

// Style Imports
// import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import './Graphic.css'


const Home = () => {
    // const classes = useStyles();
    return (
        <>
            <Container>
                <Grid 
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    >
                        <Grid>
                            <Typography variant="h2">for book enthusiasts</Typography>
                            <Typography variant="h6">a niche social app that is private, simple, and efficienct.</Typography>
                            <br />
                            <AuthenticationButton />
                            <SignupButton />
                        </Grid>
                        <Grid >
                            <br />
                            <div 
                                className="shapeshifter play" 
                                style={{ backgroundImage: `url(require("./Graphic.svg"))` }}
                            />
                        </Grid>
                </Grid>
            </Container>
        </>
    )
};

export default Home;