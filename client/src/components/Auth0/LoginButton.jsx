import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
}));


const LoginButton = () => {
    const classes = useStyles();
    const { loginWithRedirect } = useAuth0();

    return (
        <Button 
            variant="contained" 
            color="secondary"
            onClick={() => loginWithRedirect()}
            size="large"
            className={classes.margin}
        >
            Log In
        </Button>
    );
};

export default LoginButton;