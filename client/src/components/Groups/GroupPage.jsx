import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, GridList, GridListTile, Button, TextField}  from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'primary',
    },
    groupBar: {
        background: '#52781e',
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    groupsDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        boxShadow: 'inset -12px -12px 30px #A5C3CB, inset 12px 12px 30px #475357',
        textAlign: 'center',
        color: '#002B36',
        padding: '0.8rem 1.6rem',
        marginBottom: '2rem',
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
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
            marginLeft: 0,
        },
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    margin: {
        margin: theme.spacing(2),
    },
}));

const GroupPage = () => {
    const classes = useStyles();
    const [group, setGroup] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const groupId = useParams();
    const { user } = useAuth0();

    useEffect(() => {
        console.log(groupId.id)
        axios.get(`http://localhost:3000/groups/group/${groupId.id}`)
            .then(res => {
                console.log("individual group", res);
                const data = res.data;
                setGroup(data);
            })
            .catch(err => console.log(err));
    }, []);

    const _handleJoinGroup = (e) => {
        e.preventDefault();
        const data = {
            groupId: group.id
        };
        axios.post(`http://localhost:3000/groups/join/${user.sub}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const _handleAddComment = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/groups/comments/${groupId.id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    // return while waiting on axios, then render updated page
    if (group === null) {
        return 'Loading...';
    }

    return (
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <Typography variant="h2">{group.groupName}</Typography>
            <Typography variant="h6">{group.groupDescription}</Typography>
            <form onSubmit={_handleJoinGroup}>
                <input value={group.id} name="groupId" hidden></input>
                <Button type="submit" color="secondary" variant="contained" size="large">Join This Group</Button>
            </form>
            <Typography variant="h6">Members:</Typography>
            <div className={classes.groupsDiv}>
                <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                    {(group.Users.length !== 0) ? (group.Users.map(user => (
                        <GridListTile className={classes.groupBar} cellHeight={'auto'} key={user.id}>
                        <Typography variant="h6" style={{color: '#fff'}}>{user.name}</Typography>
                        {!!user.user_group.isAdmin ?
                        <Typography style={{color: '#fff'}}>(admin)</Typography>
                        : <Typography style={{color: '#fff'}}>(member)</Typography> }
                    </GridListTile>
                    ))) : (
                        <Typography>You're not part of any groups!</Typography>
                    )};
                </GridList> 
            </div>
            <div>
                <h4>Add new comments</h4>
            </div>
            <form onSubmit={_handleAddComment} className={classes.root} noValidate autoComplete="off">
                <TextField 
                    id="filled-multiline-static"
                    label="New Comment"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="filled" 
                    value={newComment}
                />
                <Button type="submit" color="secondary" variant="contained" size="medium">Add Comment</Button>
            </form>
            <div>
                <p>Display all group comments</p>
            </div>
            {(comments.length !== 0) ? (
                comments.map((comment) => {
                    return (
                        <>
                            <p>Username</p>
                            <p>Date Added</p>
                            <p>Comment is: </p>
                        </>
                    )
                })
            ) : (
                <p>This group has no comments yet! Why don't you add one?</p>
            )}
        </Container>
    )
}

export default GroupPage;