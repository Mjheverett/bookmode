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
            <img src={imgURL} alt='${book.covers[0]}' />
            <Typography variant="h2">{book.title}</Typography>
            <Typography variant="h4"><Link to={{
                    pathname:"/results",
                    data: details[0].Authors[0].authorName,
                    query: 'author'}}>
                        {details[0].Authors[0].authorName}
                        </Link> </Typography>
            <Typography variant="h5">{!!book.description ? !!book.description[0] ? book.description.split("(["||"["||"(SO")[0] : book.description.value: `this book does not have a description available`}</Typography>
            <Typography variant="overline">subjects: {book.subjects.map((subject)=>(
                <Link to={{
                    pathname:"/results",
                    data: subject,
                    query: 'subject'}}><span>{subject}, </span></Link>
                ))}</Typography>
        </Container>
    )
}

export default BookPage;