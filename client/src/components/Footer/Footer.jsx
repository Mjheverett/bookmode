import React from 'react';
import { Container, Typography }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    div: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: '30px',
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <div className={classes.div}>
                <Typography variant="h6"><span className="fa fa-heart" /></Typography>
                </div>
            </Container>
        </>
    )
};

export default Footer;