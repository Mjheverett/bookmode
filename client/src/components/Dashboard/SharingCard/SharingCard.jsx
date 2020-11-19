import React, {useEffect, useState}  from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { GridListTile, Typography, Card, CardHeader, GridList, CardContent }  from '@material-ui/core';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    dashboardDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        textAlign: 'left',
        color: '#002B36',
        padding: '1.6rem',
        marginBottom: '2rem',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    typography: {
        padding: theme.spacing(2),
        alignItems: 'center',
        color: '#002B36',
    },
    link: {
        color: '#002B36',
    },
    avatar: {
        backgroundColor: '#52781e',
    },
    card: {
        width: 'auto',
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: fade(theme.palette.common.white, 0.15),
        color: '#002B36',
        textAlign: 'left',
    },
    commentsMobile: {
        display: 'inlineBlock',
        width: '100%',   
    },  
}));

const SharingCard = () => {
    const classes = useStyles();
    const [received, setReceived] = useState([]);
    const { user } = useAuth0();
    const url = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${url}/recommendations/received/${user.sub}`)
        .then(res => {
            const data = res.data;
            // console.log('res.data.received:', data)
            setReceived(data)
        });
    }, [user.sub]);

    // Finds screen width and updates the columns display
    const columnsSize = () => {
        const width = window.screen.width;
        let columns = 0;
        if (width >= '1100') {
            columns = 4;
        }  
        else if (width >= '800') {
            columns = 3;
        }  
        else if  (width >= '600') {
            columns = 2;
        }
        else if (width < '600') {
            columns = 1;
        }
        else {columns = 2;
        }
        return columns;
    }

    return (
        <>
            <Typography variant="h6"><Link to="/sharing">Your Sharing</Link></Typography>
            <br/>
            <div className={classes.dashboardDiv}>
                <GridList className={classes.gridList} cols={received.length !==0 ? columnsSize() : 1} cellHeight={'auto'}> 
                {received.length !== 0 ? (received.map(prop => (
                    <GridListTile cellHeight={'auto'}>
                    <br />
                    <Card className={classes.card} >
                        <CardHeader
                            avatar={
                            <Avatar className={classes.avatar}>
                                {prop.sender.name[0]}
                            </Avatar>
                            }
                            title={prop.sender.name}
                            subheader={moment(prop.createdAt).format('MMMM Do YYYY, h:mm a')}
                        />
                        <CardContent>
                        <Link to={`${prop.Book.editionKey}`}><Typography color="secondary" variant="h6">{prop.Book.title}</Typography></Link>
                            <Typography style={{color: '#002B36'}}>{prop.comment}</Typography>
                        </CardContent>
                    </Card>
                    <br />
                  </GridListTile>
                ))) : (
                    <Typography>You don't have any recommendations yet! <Link style={{color: '#52781e'}} to="/sharing">Send one here.</Link></Typography>
                )}
                </GridList>
                <br />
            </div>
        </>
    )
}

export default SharingCard;