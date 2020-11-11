import React from 'react';
import { Container, Typography }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bookmodeLogo from '../../images/bookmode.png';

const useStyles = makeStyles((theme) => ({
    div: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: '30px',
    },
    logo: {
        maxWidth: 250, 
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <div className={classes.div}>
                <a href="/"><img src={bookmodeLogo} alt="bookmode logo" className={classes.logo} /></a> 
                <Typography>Made with <span className="fa fa-heart" /> by ¡ƎƎ˥ W∀Ǝ┴</Typography>
            </div>
            </Container>
        </>
    )
};

export default Footer;