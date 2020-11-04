import React from 'react';
import AuthenticationButton from '../Auth0/AuthenticationButton';
import SignupButton from '../Auth0/SignUpButton';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './Graphic.css'

// const useStyles = makeStyles((theme) => ({
//     paper: {
//       textAlign: 'center',
//     },
// }));

const Home = () => {
    return (
        <>
            <Grid 
                container
                direction="row"
                justify="space-evenly"
                alignItems="center">
                    <Grid item>
                        <h1>an app for book enthusists</h1>
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
        </>
    )
};

export default Home;