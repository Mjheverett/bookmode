import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, AccordionSummary, Accordion, AccordionDetails}  from '@material-ui/core';
import BigList from './List';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    notificationDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        textAlign: 'center',
        color: '#002B36',
        padding: '0.8rem 1.6rem',
        marginBottom: '2rem',
    },
    root: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
        backgroundColor: 'transparent',
    },
    typography: {
        padding: theme.spacing(2),
        alignItems: 'center',
        color: '#002B36',
    },
    inline: {
        display: 'inline',
    },
}));

const Sharing = () => {
    const classes = useStyles();
    const [sent, setSent] = useState([]);
    const [received, setReceived] = useState([]);
    const { user } = useAuth0();
    const url = process.env.REACT_APP_API_URL;

    //Grabbing screen width on load. Pulling into comments classes.
    const lWidth = window.screen.width;
    // console.log("screen width is",lWidth);

    useEffect(() => {
        axios.get(`${url}/recommendations/sent/${user.sub}`)
            .then(res => {
                const data = res.data;
                // console.log('res.data.sent:', data)
                setSent(data)
            });
        axios.get(`${url}/recommendations/received/${user.sub}`)
        .then(res => {
            const data = res.data;
            // console.log('res.data.received:', data)
            setReceived(data)
        });
    }, [user.sub]);

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Typography variant="h2">Sharing</Typography>
                <br />
                <Typography variant="h6">View Recommendations</Typography>
                <br />
                <div className={classes.notificationDiv}>
                    <div className={classes.root}>
                        <Accordion className={classes.root}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography variant="h6" className={classes.typography}>Received recommendations</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {received.length ? <BigList received = {received}/> : <Typography className={classes.typography}>You haven't received any recommendations yet.</Typography>}
                            </AccordionDetails>                        
                        </Accordion>
                        <Accordion className={classes.root}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            >
                            <Typography variant="h6" className={classes.typography}>Sent recommendations</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {sent.length ? <BigList sent = {sent}/> : <Typography className={classes.typography}>You haven't sent any recommendations yet.</Typography>}
                            </AccordionDetails>
                        </Accordion>
                    </div>   
                </div>
                <Typography style={{textAlign: 'end'}}>Scroll for More <span class="fas fa-long-arrow-alt-right"></span></Typography>
            </Container>
        </>
    )
}

export default Sharing;