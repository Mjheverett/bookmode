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
        textAlign: 'center',
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

    useEffect(() => {
        axios.get(`http://localhost:3000/recommendations/received/${user.sub}`)
        .then(res => {
            const data = res.data;
            console.log('res.data.received:', data)
            setReceived(data)
        });
    }, [user.sub]);

    // Finds screen width and updates the columns display
    const width = window.screen.width;
    const columns = width === 'xs' || width === 'sm' ? 1 : 2;

    return (
        <>
            <div className={classes.dashboardDiv}>
                <Typography variant="h6" className={classes.typography}><Link className={classes.link} to="/sharing">Your Sharing</Link></Typography>
                <GridList className={classes.gridList} cols={columns} cellHeight={'auto'}> 
                {(received.map(prop => (
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
                            <Typography variant="h6" style={{color: '#002B36'}}>{prop.Book.title}</Typography>
                            <Typography style={{color: '#002B36'}}>{prop.comment}</Typography>
                        </CardContent>
                    </Card>
                    <br />
                    </GridListTile>
                )))} : (
                    <Typography>You're don't have any reccomendations yet! <Link style={{color: '#52781e'}} to="/sharing">Send one here.</Link></Typography>
                )
                </GridList>
                <br />
            </div>
        </>
    )
}

export default SharingCard;