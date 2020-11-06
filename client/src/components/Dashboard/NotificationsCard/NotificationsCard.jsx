import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { GridListTile, Typography, List, ListItem }  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dashboardDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#EBEBEB',
        boxShadow: 'inset -12px -12px 30px #ffffff, inset 12px 12px 30px #c8c8c8',
        textAlign: 'center',
        color: '#93A1A1',
        padding: '0.8rem 1.6rem',
        marginBottom: '2rem',
        marginLeft: '1rem',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    typography: {
        padding: theme.spacing(2),
        alignItems: 'center',
        color: '#93A1A1',
    },
}));


const NotificationsCard = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.dashboardDiv}>
                <Typography variant="h6" className={classes.typography}><Link to="/notifications">Your Notifications</Link></Typography>
                <GridListTile cellHeight={'auto'}>
                    <Typography>
                        <List>
                            <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
                            <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
                            <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
                            <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
                        </List>
                    </Typography>
                </GridListTile>
            </div>
        </>
    )
}

export default NotificationsCard;