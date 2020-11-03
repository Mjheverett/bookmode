import React from 'react';
import AuthenticationButton from '../Auth0/AuthenticationButton';
import SignupButton from '../Auth0/SignUpButton';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ''

// const useStyles = makeStyles((theme) => ({
//     paper: {
//       textAlign: 'center',
//     },
// }));

const Home = () => {
    return (
        <>
        <Grid container spacing={3}>
            <Grid item>
                <h1>an app for book enthusists</h1>
                <br />
                <AuthenticationButton />
                <SignupButton />
            </Grid>
            <Grid item>
                <p>Image will go here</p>
            </Grid>
        </Grid>
        </>
    )
};

export default Home;