import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { GridListTile, Typography, List, ListItem }  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dashboardDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        boxShadow: 'inset -12px -12px 30px #A5C3CB, inset 12px 12px 30px #475357',
        textAlign: 'center',
        color: '#002B36',
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
        color: '#002B36',
    },
    link: {
        color: '#002B36',
    },
}));

const GroupsCard = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.dashboardDiv}>
                <Typography variant="h6" className={classes.typography}><Link className={classes.link} to='/groups'>Your Groups</Link></Typography>
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

export default GroupsCard;