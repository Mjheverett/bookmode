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
    const { user } = useAuth0(null);
    const classes = useStyles();
    const [ userInfo, setUser ] = useState(null);

    useEffect(() => {
        (async function (){
            const data = {
                id: user.sub,
               
            };
            console.log("user sub is", user.sub)
            const url = await `http://localhost:3000/users/${user.sub}`;
            const res = axios.get(url)
                .then(res => {
                    const data = res.data;
                    console.log('data is:', data)
                    setUser(data);
                })
                
            })();
            
    },[]);  

    
    // trying both updateData and _handleInfoChange for put request

    const updateData = (e) => {
        e.preventDefault();
        const data = {
            id: user.sub,
            name: user.name,
            email: user.email
        };
        axios.put(`http://localhost:3000/users/${user.sub}`, data)
            .then(res => {
                const newData = res.data;
                setUser(newData);
                console.log('put data is: ', newData)
            })
            .catch(err => console.log(err));
    }

   

     // trying both _handleInfoChange and updateData for put request

    // const _handleInfoChange = (e) => {
    //     e.preventDefault();
    //     const newData = {
    //         id: user.sub,
    //         name: user.name,
    //         email: user.email
    //     };
    //     axios.put(`http://localhost:3000/users/${user.sub}`, newData)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // };

    const _handleChange = (newData) => {
        console.log(newData)
        setUser(newData);
    };


    if (userInfo === null) {
        return 'Loading...';
    }

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Typography variant="h2">Profile Page</Typography>
                
                <br />
                <br />
                <br />
                <div className={classes.profileDiv}>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                        <GridListTile cellHeight={'auto'}>
                            <Typography variant="h6">{userInfo.name} </Typography>
                            <Typography variant="h6">{userInfo.email}</Typography>
                            <CardMedia><img className="" src={user.picture} alt="Profile"/></CardMedia>
                        </GridListTile>
                        <GridListTile cellHeight={'auto'}>
                            <Typography variant="h6" >Change Profile Info</Typography>
                            <form onSubmit={(e) => updateData(e)}>
                                <label>Name 
                                    <input type='text' name='name' onChange={(event) => _handleChange(event.target.value)}>

                                    </input>
                                </label>
                                <label>Email 
                                    <input type='text' name='email' onChange={(event) => _handleChange(event.target.value)}>

                                    </input>
                                </label>
                                <Button type="submit" color="secondary" variant="contained" size="large">Update Profile</Button>
                            </form>
                        </GridListTile>
                    </GridList> 
                </div>
            </Container>
        </>
    )
}

export default Profile;