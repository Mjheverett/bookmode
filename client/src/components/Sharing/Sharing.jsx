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
        boxShadow: 'inset -12px -12px 30px #A5C3CB, inset 12px 12px 30px #475357',
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
    useEffect(() => {
        axios.get(`http://localhost:3000/recommendations/sent/${user.sub}`)
            .then(res => {
                const data = res.data;
                console.log('res.data.sent:', data)
                setSent(data)
            });
        axios.get(`http://localhost:3000/recommendations/received/${user.sub}`)
        .then(res => {
            const data = res.data;
            console.log('res.data.received:', data)
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
                                <Typography className={classes.heading}>Received recommendations</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {received.length ? <BigList received = {received}/> : <p>You haven't received any recommendations yet.</p>}
                                    
                                </AccordionDetails>
                            
                            </Accordion>
                            <Accordion className={classes.root}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>Sent recommendations</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {sent.length ? <BigList sent = {sent}/> : <p>You haven't sent any recommendations yet.</p>}
                                </AccordionDetails>
                            </Accordion>
                            </div>
                        
                </div>
            </Container>
        </>
    )
}

export default Sharing;