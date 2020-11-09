import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, GridList, GridListTile, Typography, Button, CardMedia }  from '@material-ui/core';
import axios from 'axios';


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
    // const { userAuth0 } = useAuth0();
    const classes = useStyles();
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        (async function (){
            const url = await (`http://localhost:3000/users`);
            console.log(url);
            const res = axios.get(url)
                .then(res => {
                    const data = res.data[3];
                    console.log('data is:', data)
                    setUser(data);
                })
                
            })();
            
    },[]);  

    if (user === null) {
        return 'Loading...';
    }

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Typography variant="h2">Profile Page</Typography>
                
                <br />
                <Button color="secondary" variant="contained" size="large">Update Profile</Button>
                <br />
                <br />
                <div className={classes.profileDiv}>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                        <GridListTile cellHeight={'auto'}>
                            <Typography variant="h6">{user.name} </Typography>
                            <Typography style= {{fontSize: '.75rem'}}variant="h6">{user.email}</Typography>
                            {/* <CardMedia><img className="" src={userAuth0.picture} alt="Profile"/></CardMedia> */}
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