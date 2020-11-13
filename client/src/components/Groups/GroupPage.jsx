import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, GridList, GridListTile, Button, TextField, Card, CardHeader, CardContent, Avatar}  from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'primary',
    },
    groupBar: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        borderRadius: '4px',
        width: 'auto',
    },
    groupsDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        textAlign: 'center',
        color: '#002B36',
        padding: '0.8rem 1.6rem',
        marginBottom: '2rem',
        // maxWidth: "600px",
    },
    gridList: {
        flexWrap: 'wrap',
        transform: 'translateZ(0)',
    },
    margin: {
        margin: theme.spacing(2),
    },
    textField: {
        position: 'relative',
        width: '100%',
        maxWidth: "600px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
    },
    avatar: {
        backgroundColor: '#52781e',
    },
    avatarAdmin: {
        backgroundColor: '#244B00',
    },
    card: {
        width: 'auto',
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: fade(theme.palette.common.white, 0.15),
        color: '#002B36',
        textAlign: 'left',
        fontSize: '1rem',
    },
    commentsMobile: {
        display: 'inlineBlock',
        width: '100%',   
    },
}));

const GroupPage = () => {
    const classes = useStyles();
    const [group, setGroup] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const groupId = useParams();
    const { user } = useAuth0();
    
    //Grabbing screen width on load. Pulling into comments classes.
    const lWidth = window.screen.width;
    // console.log("screen width is",lWidth);

    useEffect(() => {
        axios.get(`http://localhost:3000/groups/group/${groupId.id}`)
            .then(res => {
                const data = res.data;
                setGroup(data);
            })
            .catch(err => console.log(err));
        axios.get(`http://localhost:3000/groups/comments/${groupId.id}`)
            .then(res => {
                const data = res.data;
                // console.log("comment response data", data);
                setComments(data);
            })
            .catch(err => console.log(err));
    }, [groupId.id]);

    const _handleJoinGroup = (e) => {
        e.preventDefault();
        const data = {
            groupId: group.id
        };
        axios.post(`http://localhost:3000/groups/join/${user.sub}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const _handleLeaveGroup = (e) => {
        e.preventDefault();
        const data = {
            groupId: group.id,
            userId: user.sub
        };
        axios.post(`http://localhost:3000/groups/leave/${user.sub}`, data)
            .then(res => console.log("leave group response", res))
            .catch(err => console.log(err));
    };

    const _handleComment = (data) => {
        setNewComment(data);
    }

    const _handleAddComment = async (e) => {
        e.preventDefault();
        const data = {
            userId: user.sub,
            content: newComment
        }
        // console.log("add comment data", data);
        await axios.post(`http://localhost:3000/groups/comments/add/${groupId.id}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        await axios.get(`http://localhost:3000/groups/comments/${groupId.id}`)
            .then(res => {
                const data = res.data;
                // console.log("comment response data", data);
                setComments(data);
            })
            .catch(err => console.log(err));   
        setNewComment('');
    }

    // return while waiting on axios, then render updated page
    if (group === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    }

    return (
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <Typography variant="h2">{group.groupName}</Typography>
            <br/>
            <Typography variant="h6">{group.groupDescription}</Typography>
            <br/>
            <form onSubmit={_handleJoinGroup}>
                <input value={group.id} name="groupId" hidden></input>
                <Button type="submit" color="secondary" variant="contained" size="large">Join This Group</Button>
            </form>
            <form style={{marginTop: '1rem'}} onSubmit={_handleLeaveGroup}>
                <input value={group.id} name="groupId" hidden></input>
                <Button type="submit" color="secondary" variant="contained" size="large">Leave This Group</Button>
            </form>
            <br />
            <Typography variant="h6">Members</Typography>
            <div className={classes.groupsDiv}>
                <GridList className={classes.gridList} cols={1} cellHeight={'auto'}>
                    {(group.Users.length !== 0) ? (group.Users.map(user => (
                        <GridListTile cellHeight={'auto'} key={user.id}>
                        {!!user.user_group.isAdmin ?
                        <>  
                            <Card className={classes.card} style={{background: '#52781e'}}>
                                <CardHeader
                                    avatar={
                                        <Avatar className={classes.avatarAdmin}>
                                            {user.name[0]}
                                        </Avatar>
                                    }
                                        title={user.name}
                                        subheader='Group Admin'
                                />
                            </Card>
                        </>
                        : 
                        <>  
                            <Card className={classes.card}>
                                <CardHeader
                                    avatar={
                                        <Avatar className={classes.avatar}>
                                            {user.name[0]}
                                        </Avatar>
                                    }
                                        title={user.name}
                                        subheader='Member'
                                />
                            </Card>
                        </>
                        }
                    </GridListTile>
                    ))) : (
                        <Typography>You're not part of any groups!</Typography>
                    )};
                </GridList> 
            </div>
            <div>
                <Typography variant="h6">Comments</Typography>
            </div>
            <Typography>
                <form onSubmit={_handleAddComment} style={{color: '#93A1A1'}} noValidate autoComplete="off">
                    <TextField 
                        id="filled-multiline-static"
                        className={classes.textField}
                        placeholder="New Comment"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="filled" 
                        onChange={(event) => _handleComment(event.target.value)}
                        value={newComment}
                        style={{color: '#93A1A1'}}
                    />
                    <br />
                    <br />
                    <Button type="submit" color="secondary" variant="contained" size="large">Add Comment</Button>
                </form>
                <br />
            </Typography>
            <div className={classes.groupsDiv}> 
                <GridList  className={lWidth > 575 ? classes.gridList : classes.commentsMobile} cols={1} cellHeight={'auto'} >
                {(comments.length !== 0) ? (
                    comments.map((comment) => {
                        return (
                            <div>
                                <GridListTile cellHeight={'auto'}>
                                <br />
                                <Card className={classes.card} >
                                    <CardHeader
                                        avatar={
                                        <Avatar className={classes.avatar}>
                                            {comment.Users[0].name[0]}
                                        </Avatar>
                                        }
                                        title={comment.Users[0].name}
                                        subheader={moment(comment.createdAt).format('MMMM Do YYYY, h:mm a')}
                                    />
                                    <CardContent>
                                        <Typography style={{color: '#002B36'}}>{comment.content}</Typography>
                                    </CardContent>
                                </Card>
                                <br />
                                </GridListTile>
                            </div>
                        )
                    })
                ) : (
                    <Typography>This group has no comments yet! Why don't you add one?</Typography>
                )}
                </GridList>
                
            </div>
            {/* <Typography style={{textAlign: 'end'}}>Scroll for More <span class="fas fa-long-arrow-alt-right"></span></Typography> */}
        </Container>
    )
}

export default GroupPage;