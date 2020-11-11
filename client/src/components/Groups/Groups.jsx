import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, InputBase }  from '@material-ui/core';
import GroupsList from './GroupsList';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'primary',
    },
    inputInput: {
        padding: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
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
    margin: {
        margin: theme.spacing(2),
    },
}));

const Groups = () => {
    const classes = useStyles();
    const [name, setGroupName] = useState('');
    const [description, setGroupDescription] = useState('');
    const [userGroups, setUserGroups] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const { user } = useAuth0();

    useEffect(() => {
        (async function (){
            axios.get(`http://localhost:3000/groups/${user.sub}`)
                .then(res => {
                    const data = res.data;
                    // console.log('res.data:', data)
                    setUserGroups(data)
                })
            axios.get(`http://localhost:3000/groups/`)
                .then(res => {
                    const data = res.data;
                    // console.log('res.data:', data)
                    setAllGroups(data)
                })
            })();
    }, [user.sub]);

    const _handleNameChange = (data) => {
        setGroupName(data);
    };

    const _handleDescChange = (data) => {
        setGroupDescription(data);
    };

    const _handleCreateGroup = (e) => {
        e.preventDefault();
        const data = {
            groupName: name,
            groupDescription: description
        };
        
        axios.post(`http://localhost:3000/groups/add/${user.sub}`, data)
            .then(res => {
                console.log(res)
                const data = res.data;
                const newGroupData = {
                    id: data.GroupId,
                    groupName: name,
                    groupDescription: description
                };
                setUserGroups([...userGroups, newGroupData]);
                setAllGroups([...allGroups, newGroupData]);
            })
            .catch(err => console.log(err));
        setGroupName('');
        setGroupDescription('');
    };

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Typography variant="h2">Groups</Typography>
                <br />
                <Typography variant="h6">Get connected, create new groups here!</Typography>
                <br />
                <Typography>
                    <form onSubmit={_handleCreateGroup}>
                        <label>Group Name
                            <div className={classes.search}>
                                <InputBase style={{color: '#93A1A1'}}
                                    placeholder="Epic Group Name..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    name='groupName' 
                                    onChange={(event) => _handleNameChange(event.target.value)} 
                                    value={name}
                                />
                            </div>
                        </label>
                        <br />
                        <label>Group Description
                        <div className={classes.search}>
                                <InputBase
                                    style={{color: '#93A1A1'}}
                                    placeholder="Group Description..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    name='groupDescription'
                                    onChange={(event) => _handleDescChange(event.target.value)} 
                                    value={description}
                                />
                        </div>
                        </label>
                        <br/>
                        <Button type="submit" color="secondary" variant="contained" size="large">Create New Group</Button>
                        <Button type="button" color="secondary" variant="outlined" size="large" className={classes.margin}>Cancel</Button>
                    </form>
                </Typography>
                <br />
                <br />
                <GroupsList list={"User"} groups={userGroups} />
                <GroupsList list={"All"} groups={allGroups} />
            </Container>
        </>
    )
}

export default Groups;
