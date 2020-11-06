import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button }  from '@material-ui/core';
import GroupsList from './GroupsList';

const useStyles = makeStyles((theme) => ({
    
}));

const Groups = () => {
    const [userGroups, setUserGroups] = useState({});
    const [allGroups, setAllGroups] = useState({});
    const [name, setGroupName] = useState('');
    const [description, setGroupDescription] = useState('');
    const classes = useStyles();

    useEffect(() => {
        axios.get('http://localhost:3000/groups/all')
            .then(res => {
                const allData = res.data;
                setAllGroups({allGroups: allData});
            });
        axios.get('http://localhost:3000/groups/user')
            .then(res => {
                const userData = res.data;
                setUserGroups({userGroups: userData});
            });
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const _handleNameChange = (data) => {
        console.log(data)
        setGroupName(data);
    };

    const _handleDescChange = (data) => {
        console.log(data)
        setGroupDescription(data);
    };

    const _handleCreateGroup = (e) => {
        e.preventDefault();
        const data = {
            groupName: name,
            groupDescription: description
        };
        axios.post('http://localhost:3000/library/add', data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h2">Groups</Typography>
                <br />
                <Button type="button" color="secondary" aria-describedby={id} variant="contained" size="medium" onClick={handleClick}>Add Group</Button>
                <div>
                    <p>Are you a fan of creating groups? Well, have I got a form for you!!</p> 
                    <form onSubmit={_handleCreateGroup}>
                        <label>Group Name:
                            <input 
                                name='groupName' 
                                onChange={(event) => _handleNameChange(event.target.value)} 
                            />
                        </label>
                        <label>group Description
                            <textarea 
                                name='groupDescription'
                                onChange={(event) => _handleDescChange(event.target.value)} 
                            />
                        </label>
                        <Button type="submit" color="secondary" aria-describedby={id} variant="contained" size="medium" onClick={handleClick}>Create New group</Button>
                        <Button type="button" color="default" aria-describedby={id} variant="outlined" size="medium" onClick={handleClick}>Cancel</Button>
                    </form>
                </div>
                <br />
                <br />
                <GroupsList list={"User"} />
                <GroupsList list={"All"} />
            </Container>
        </>
    )
}

export default Groups;
