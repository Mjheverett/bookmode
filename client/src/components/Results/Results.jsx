import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../../images/book_cover.png';
import { makeStyles } from '@material-ui/core/styles';
import { Container, GridList, GridListTile, GridListTileBar, Typography, Popover, IconButton }  from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import InfoIcon from '@material-ui/icons/Info';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
    resultsDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        textAlign: 'center',
        color: '#002B36',
        padding: '0.8rem 1.6rem',
        marginBottom: '2rem',
    },
    typography: {
        padding: theme.spacing(2),
        alignItems: 'center',
        color: '#002B36',
        backgroundColor: '#768B91',
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
    titleBar: {
        background: '#52781e',
        color: '#fffff',
        borderRadius: '4px',
    },
    titleBarTop: {
        background: 'rgba(0, 43, 54, .001)',
        color: '#52781e',
    },
}));

const Results = (props) => {
    const classes = useStyles();
    const [clicks, setClicks] = useState([])
    const [popoverId, setPopoverId] = useState(null);
    const [results, setResults] = useState(null);
    const { data, query } = props.location;
    const { user } = useAuth0();
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        (async function (){
            let url;
            if (query === 'all') {
                url = `http://openlibrary.org/search.json?q=${data}&limit=50`;
            }
            if (query === 'title') {
                url = `http://openlibrary.org/search.json?title=${data}&limit=50`;
            }
            if (query === 'author') {
                url = `http://openlibrary.org/search.json?author=${data}&limit=50`;
            }
            if (query === 'subject') {
                url = `http://openlibrary.org/search.json?subject=${data}&limit=50`;
            }
            if (query === 'ISBN') {
                url = `http://openlibrary.org/search.json?ISBN=${data}&limit=50`;
            }
            await axios.get(url)
                .then(res => {
                    const data = res.data.docs;
                    setResults(data);
                })
            })();
    }, [data, query]);    
    
    const handleClick = (event, popoverId) => {
        setPopoverId(popoverId);
        setAnchorEl(event.currentTarget);
    };
    const checkRegex =(obj)=>{
        let narArr = []
        const regTest = /Narrator/
        narArr = obj.filter(narrator =>(
            regTest.test(narrator)
        ))
        return narArr
    }
    const handleClose = () => {
        setPopoverId(null);
        setAnchorEl(null);
    };
    const _handleAddLibrary = (id, title, author, imageURL, editionKey, reader) =>{
        //adds the ID of the clicked item to the array if it isn't there and removes from array if it is there
        let result =  clicks.includes(id) ? clicks.filter(click => click !== id): [...clicks, id]
        setClicks(result)
        console.log(title, author, imageURL, editionKey, reader)
        author = !!author ? author.length >= 2 ? author.join(', ') : author[0] : null
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

    if (results === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    }

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <Typography variant="h2">Books</Typography>
            <br />
            <Typography variant="h6">Add books to your library by clicking the <BookmarkIcon fontSize="medium"/> </Typography>
            <br />
                <div className={classes.resultsDiv}>
                <br/>
                    <GridList className={classes.gridList} cols={3} cellHeight={240} spacing={16}>
                        {results.map((result) => {

                            return (
                            <GridListTile key={result.key}>
                                <div width={'auto'} className={classes.div}>
                                    <img src={!!result.cover_i ? `http://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg` : image}
                                    alt={result.cover_i} style={{height: '139px'}}/>
                                </div>
                                <GridListTileBar
                                title={result.title}
                                subtitle= {<span>by: {!!result.author_name ? result.author_name.length !==1 ? result.author_name.join(', ') : result.author_name : `no author listed`} </span>}
                                classes={{
                                    root: classes.titleBar,
                                }}
                                actionIcon={
                                    <IconButton aria-label={`info about ${result.title}`} onClick={(e) => handleClick(e, result.key)} className={classes.icon}>
                                    
                                    <InfoIcon />
                                    </IconButton>}
                                    
                            />
                            <Popover
                            id={result.key}
                            open={popoverId === result.key}
                            anchorEl={anchorEl}
                            className={classes.root}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                        >
                            <Typography className={classes.typography}>
                                Title: {result.title}
                            </Typography>
                                {!!result.subtitle ?
                                <Typography className={classes.typography}>
                                    Subtitle: {result.subtitle} 
                                    </Typography>
                                    : null}
                            <Typography className={classes.typography}>
                                {!!result.author_name ? result.author_name.length !==1 ? `Authors: ${result.author_name.join(', ')}` : `Author: ${result.author_name}`: `This title has no author listed.`}
                            </Typography>
                                {!!result.contributor ? !!checkRegex(result.contributor).length ? checkRegex(result.contributor).length !==1 ? <Typography className={classes.typography}> Narrators: {checkRegex(result.contributor).join(', ')} </Typography> : <Typography className={classes.typography}>Narrator: {checkRegex(result.contributor).join(', ')} </Typography> : null : null}
                            <Typography className={classes.typography}>
                            {!!result.ebook_count_i ? result.ebook_count_i !==0 ? result.ebook_count_i !==1 ? `This title has ${result.ebook_count_i} available versions on ebook.` : `This title has 1 available version on ebook.` : `This title has no available versions on ebook.` : `This title has no available versions on ebook.`}
                            </Typography>
                        </Popover>
                            <GridListTileBar
                                classes={{
                                    root: classes.titleBarTop,
                                }}
                                titlePosition ={'top'}
                                actionIcon={
                                    <IconButton aria-label={`${result.key}`} onClick={() => _handleAddLibrary(result.key, result.title, result.author_name, `http://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`, result.key, !!result.contributor ? !!checkRegex(result.contributor).length ? checkRegex(result.contributor).join(', ') : null : null)}>
                                    {/*makes sure that the correct icon is displayed for clicked or not clicked*/}
                                    {clicks.includes(result.key) ? <BookmarkIcon fontSize="large" className={classes.title} /> : <BookmarkBorderIcon fontSize="large" className={classes.title} />}
                                    </IconButton> }
                            />
                            </GridListTile>
                            )})}
                    </GridList> 
                </div>
                <Typography style={{textAlign: 'end'}}>Scroll for More <span class="fas fa-long-arrow-alt-right"></span></Typography>
            </Container>
        </>
    );
}

export default Results;