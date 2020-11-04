import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#D33682',
        '&:hover': {
            backgroundColor: '#859900',
        },
        color: '#002B36',
    },
}));

const LogoutButton = () => {
    const { logout } = useAuth0();
    const classes = useStyles();

    return (
        <Button 
            variant="contained" 
            className={classes.button}  
            onClick={() => logout({ returnTo: window.location.origin })}
            size="large"
        >
            Log Out
        </Button>
    );
};

export default LogoutButton;