import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#D33682',
        '&:hover': {
            backgroundColor: '#859900',
        },
        color: '#002B36',
        margin: theme.spacing(0, 2),
    },
}));

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    const classes = useStyles();

    return (
        <Button 
            variant="contained" 
            className={classes.button}  
            onClick={() => loginWithRedirect()}
            size="large"
        >
            Log In
        </Button>
    );
};

export default LoginButton;