import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios-https-proxy-fix'; 
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link} from 'react-router-dom';
import { Container, Typography}  from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import image from '../../images/book_cover.png';
// import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    detailDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        textAlign: 'center',
        color: '#002B36',
        padding: '3rem',
        marginBottom: '2rem',
    },
    typography: {
        padding: theme.spacing(2),
        alignItems: 'center',
        color: '#002B36',
        backgroundColor: '#768B91',
    },
    link: {
        color: '#002B36',
    },
}));

const BookPage = () => {
    const classes = useStyles();
    const [book, setBook] = useState(null);
    const editionKey = useParams();
    const [details, setDetails] = useState(null);
    const { user } = useAuth0();
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
        axios.get(`http://localhost:3000/results?key=/works/${editionKey.editionKey}`)
            .then(res => {
                const data = res.data;
                console.log(data)
                setDetails(data);
            })
            .catch(err => console.log(err));
    }, [editionKey.editionKey]);
     const getData = async () => {
        console.log(editionKey.editionKey)
        const url = `http://openlibrary.org/works/${editionKey.editionKey}.json/`
        await axios.get(`http://localhost:3000/proxy?url=${url}`)
            .then(res => {
                const data = res.data;
                console.log(data)
                setBook(data);
            })
            .catch(err => console.log(err));
        await axios.get(`http://localhost:3000/results?title=${book.title}`)
            .then(res => {
                const data = res.data;
                console.log(data)
                setBook(data);
            })
            .catch(err => console.log(err));
     }
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
    if (book === null || details === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    }
    const imgURL = !!book.covers[0] ? `http://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` : image
    return (
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <Typography variant="h2">{book.title}</Typography>
            <br/>
            <Typography variant="h6">Book Details</Typography>
            <br/>
            <div className={classes.detailDiv}>
            <img src={imgURL} alt='${book.covers[0]}' />
            <br />
            <br />
            <Typography className={classes.typography} variant="h6"><Link className={classes.link} to={{
                    pathname:"/results",
                    data: details[0].Authors[0].authorName,
                    query: 'author'}}>
                        {details[0].Authors[0].authorName}
                        </Link> </Typography>
            <Typography>{!!book.description ? !!book.description[0] ? book.description.split("(["||"["||"(SOU")[0] : book.description.value: `This book does not have a description available.`}</Typography>
            <br />
            <br />
            <Typography className={classes.typography}>Subjects: {book.subjects.map((subject)=>(
                <Link className={classes.link} to={{
                    pathname:"/results",
                    data: subject,
                    query: 'subject'}}><span>{subject}, </span></Link>
                ))}</Typography>
            </div>
        </Container>
    )
}

export default BookPage;