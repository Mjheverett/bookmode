import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios-https-proxy-fix'; 
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { Container, Typography, GridList, GridListTile, Button, TextField, Card, CardHeader, CardContent, Avatar}  from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
// import moment from 'moment';

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
        textAlign: 'center',
        color: '#002B36',
        padding: '0.8rem 1.6rem',
        marginBottom: '2rem',
    },
    gridList: {
        flexWrap: 'nowrap',
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
    card: {
        width: 'auto',
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: fade(theme.palette.common.white, 0.15),
        color: '#002B36',
        textAlign: 'left',
    },
    commentsMobile: {
        display: 'inlineBlock',
        width: '100%',
        
        
    },
}));

const BookPage = () => {
    const classes = useStyles();
    const [book, setBook] = useState(null);
    const editionKey = useParams();
    const { user } = useAuth0();
    const proxy = {
        host: 'localhost',
        port: 3000
        };
    useEffect(() => {
        console.log(editionKey.editionKey)
        const url = `http://openlibrary.org/works/${editionKey.editionKey}.json/`
        axios.get(`http://localhost:3000/proxy?url=${url}`)
            .then(res => {
                const data = res.data;
                console.log(data)
                setBook(data);
            })
            .catch(err => console.log(err));
    }, [editionKey.editionKey]);
    const _handleAddLibrary = (title, author, imageURL, editionKey, reader) =>{
        console.log(title, author, imageURL, editionKey, reader)
        author = author.length >= 2 ? author.join(', ') : author[0]
        const data = {
            title: title,
            coverURL: imageURL,
            authorName: author,
            readerName: reader, 
            editionKey: editionKey
        };
        axios.post(`http://localhost:3000/results/add/${user.sub}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    const _handleDeleteBook = (e) => {
        e.preventDefault();
        const data = {
            editionKey
        };
        axios.post(`http://localhost:3000/books/delete/${user.sub}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    // return while waiting on axios, then render updated page
    if (book === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    }
    const imgURL = `http://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    return (
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <img src={imgURL} alt="${book.covers[0]}" />
            <Typography variant="h2">{book.title}</Typography>
            <Typography variant="h4">{!!book.description[0] ? book.description.split("(["&&"[")[0] : book.description.value}</Typography>
            <Typography variant="overline">subjects: {book.subjects.map((subject)=>(
                <Link to={{
                    pathname:"/results",
                    data: subject,
                    query: 'subject'}}><span>{subject}, </span></Link>
                ))}</Typography>
            {/* <br/>
            <Typography variant="h6">{boo}</Typography>
            <br/>
            <form onSubmit={_handleAddLibrary}>
                <input value={group.id} name="groupId" hidden></input>
                <Button type="submit" color="secondary" variant="contained" size="large">Join This Group</Button>
            </form>
            <form style={{marginTop: '1rem'}} onSubmit={_handleDeleteBook}>
                <input value={book.id} name="bookId" hidden></input>
                <Button type="submit" color="secondary" variant="contained" size="large">Leave This Group</Button>
            </form>
            <br />
            <Typography variant="h6">Members</Typography>
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
                <Typography variant="h6">Comments</Typography>
            </div> */}
        </Container>
    )
}

export default BookPage;