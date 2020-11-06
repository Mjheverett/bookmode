import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, GridList, GridListTile, Popover, Typography, Button }  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    profileDiv:{
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

const Profile = () => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h2">Profile Page</Typography>
                <br />
                <Button color="secondary" variant="contained" size="large">Update Profile</Button>
                <br />
                <br />
                <div className={classes.profileDiv}>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                        <GridListTile cellHeight={'auto'}>
                            <Typography variant="h6" >Image will go here</Typography>
                        </GridListTile>
                        <GridListTile cellHeight={'auto'}>
                            <Typography variant="h6" >Info will go here</Typography>
                            <form>
                                <label>Name 
                                    <input>

                                    </input>
                                </label>
                                <label>Email 
                                    <input>

                                    </input>
                                </label>
                            </form>
                        </GridListTile>
                    </GridList> 
                </div>
            </Container>
        </>
    )
}

export default Profile;