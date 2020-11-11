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

    profileForm: {
        display: 'inline-block',
        position: 'relative'
         
    },

    userPicture: {
        borderRadius: '70px',
        marginTop: '0.5rem'
    },

    updateButton: {
        marginTop: '0.5rem',
        marginLeft: '1rem',
        
    },

    formInput: {
        marginLeft: '0.25rem',
        marginRight: '0.25rem'
    }

   
}));

const Profile = () => {
    const { user } = useAuth0(null);
    const classes = useStyles();
    const [ userName, setName ] = useState(null);
    const [ userEmail, setEmail ] = useState(null)
    const [userInfo, setUser ] = useState(null)

    useEffect(() => {
        (async function (){
            const data = {
                id: user.sub,    
            };
            console.log("user sub is", user.sub)
            await axios.get(`http://localhost:3000/users/${user.sub}`, data)
                .then(res => {
                    const data = res.data;
                    console.log('data is:', data)
                    setUser(data);
                })  
            })();       
    }, [user.sub]);  

    
    // trying both updateData and _handleInfoChange for put request

    const updateData = (e) => {
        e.preventDefault();
    let name = !!userName ? userName : null
    let email = !!userEmail ? userEmail: null
        const data = {
            id: user.sub,
            name,
            email
        };
        axios.put(`http://localhost:3000/users/${user.sub}`, data)
            .then(res => {
                const updateData = res.data;
                setUser(updateData);
                console.log(updateData)
                setName(null)
                setEmail(null)
            })
            .catch(err => console.log(err));
    }

    const _handleChangeName = (newData) => {
        setName(newData);
    };
    const _handleChangeEmail = (newData) => {
        setEmail(newData);
    };

    if (userInfo === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    }

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Typography variant="h2">Profile</Typography>
                <br />
                <br />
                <div className={classes.profileDiv}>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                        <GridListTile className={classes.userInfo} cellHeight={'auto'}>
                            <br/>
                            <CardMedia><img className={classes.userPicture} src={user.picture} alt="Profile"/></CardMedia>
                            <br/>
                            <Typography variant="h6">{userInfo.name} </Typography>
                            <Typography>{userInfo.email}</Typography>
                            <br/>
                        </GridListTile>
                        <GridListTile className={classes.profileForm} cellHeight={'auto'}>
                            <Typography variant="h6" >Edit Profile Info</Typography>
                            <form  onSubmit={(e) => updateData(e)}>
                                <Typography><label>Name 
                                    <input className={classes.formInput} type='text' name='name' onChange={(event) => _handleChangeName(event.target.value)}>

                                    </input>
                                </label></Typography>
                                <Typography><label >Email 
                                    <input className={classes.formInput} type='text' name='email' onChange={(event) => _handleChangeEmail(event.target.value)}>

                                    </input>
                                </label></Typography>
                                <Button className={classes.updateButton} type="submit" color="secondary" variant="contained" size="small">Update Profile</Button>
                            </form>
                        </GridListTile>
                    </GridList> 
                </div>
            </Container>
        </>
    )
}

export default Profile;