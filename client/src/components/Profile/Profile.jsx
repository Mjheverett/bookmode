import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, GridList, GridListTile, Typography, Button, CardMedia, InputBase }  from '@material-ui/core';
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
    inputRoot: {
        color: 'primary',
    },
    inputInput: {
        padding: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
        marginLeft: 0,
        [theme.breakpoints.up('md')]: {
            width: '100ch',
        },
    },
    search: {
        position: 'relative',
        maxWidth: "600px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            marginLeft: 0,
        },
    },
    profileForm: {
        display: 'inline-block',
        position: 'relative'
         
    },
    userPicture: {
        borderRadius: '70px',
        marginTop: '0.5rem'
    },
}));

const Profile = () => {
    const { user } = useAuth0(null);
    const classes = useStyles();
    const [ userName, setName ] = useState(null);
    const [ userEmail, setEmail ] = useState(null);
    const [userInfo, setUser ] = useState(null);
    const { logout } = useAuth0();

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
    };

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
    };

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Typography variant="h2">Profile</Typography>
                <br />
                <Typography variant="h6" >Edit Profile Information</Typography>
                <br />
                <Typography>
                    <form onSubmit={(e) => updateData(e)}>
                        <label>Name
                            <div className={classes.search}>
                                <InputBase 
                                    style={{color: '#93A1A1'}}
                                    placeholder="New name..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    type='text' name='name' onChange={(event) => _handleChangeName(event.target.value)}
                                />
                            </div>
                        </label>
                        <br />
                        <label>Email
                        <div className={classes.search}>
                                <InputBase
                                    style={{color: '#93A1A1'}}
                                    placeholder="New email..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    type='text' name='email' onChange={(event) => _handleChangeEmail(event.target.value)}
                                />
                        </div>
                        </label>
                        <br/>
                        <Button type="submit" color="secondary" variant="contained" size="large">Update Profile</Button>
                    </form>
                    <br />
                </Typography>
                <div className={classes.profileDiv}>
                    <GridList className={classes.gridList} cols={1} cellHeight={'auto'}>
                        <GridListTile className={classes.userInfo} cellHeight={'auto'}>
                            <br/>
                            <CardMedia><img className={classes.userPicture} src={user.picture} alt="Profile"/></CardMedia>
                            <br/>
                            <Typography variant="h6">{userInfo.name} </Typography>
                            <Typography>{userInfo.email}</Typography>
                            <br/>
                        </GridListTile>
                    </GridList> 
                </div>
                <Button type="button" color="secondary" variant="contained" size="large" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
            </Container>
        </>
    )
}

export default Profile;