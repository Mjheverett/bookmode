import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, GridList, GridListTile, Typography, List, ListItem }  from '@material-ui/core';

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
    div: {
        display: 'flex-inline',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
}));

const Notifications = () => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h2">Notifications</Typography>
                <br />
                <Typography variant="h6">View Recent Messages Here</Typography>
                <br />
                <div className={classes.notificationDiv}>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
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
                    </GridList> 
                </div>
            </Container>
        </>
    )
}

export default Notifications;