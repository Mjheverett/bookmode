import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#D33682',
        '&:hover': {
            backgroundColor: '#859900',
        },
        color: '#002B36',
    },
}));

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();
    const classes = useStyles();
    
    return (
        <Button
            variant="contained" 
            className={classes.button}
            size="large"
            onClick={() =>
                loginWithRedirect({
                screen_hint: "signup",
                })
            }
        >
            Sign Up
        </Button>
    );
};

export default SignupButton;