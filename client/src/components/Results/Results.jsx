import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Container, GridList, GridListTile, GridListTileBar, Typography, IconButton }  from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import InfoIcon from '@material-ui/icons/Info';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
    resultsDiv:{
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
    titleBar: {
        background: '#52781e',
        color: '#fffff'
    },
    titleBarTop: {
        background: 'rgba(0, 43, 54, .001)',
        color: '#52781e',
    },
}));

const Results = (props) => {
    const classes = useStyles();
    const [clicks, setClicks] = useState([])
    const [results, setResults] = useState(null);
    const { data } = props.location.state;
    const { user } = useAuth0();
    useEffect(() => {
        (async function (){
            const key = process.env.REACT_APP_GOODREADS_KEY;
            const parseString = require('xml2js').parseString;
            console.log("props.data", data);
            const url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${key}&q=${data}&page=1&search=all`;
            console.log(url);
            await axios.get(url)
                .then(res => {
                    const data = res.data;
                    parseString(data, function (err, result) {
                        const resultsData = result.GoodreadsResponse['search'][0]['results'][0]['work'];
                        console.log("ready to return", resultsData);
                        setResults(resultsData);
                        })
                })
            })();
    }, [data]);    
    
    if (results === null) {
        return 'Loading...';
    }

    const _handleAddLibrary = (id, title, author, imageURL) =>{
        //adds the ID of the clicked item to the array if it isn't there and removes from array if it is there
        let result =  clicks.includes(id) ? clicks.filter(click => click !== id): [...clicks, id]
        setClicks(result)
        console.log(title, imageURL, author)
        const data = {
            title: title,
            coverURL: imageURL,
            authorName: author
        };
        axios.post(`http://localhost:3000/results/add/${user.sub}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <Typography variant="h2">Books</Typography>
            <br />
            <Typography variant="h6">Add books to your library from here</Typography>
            <br />
                <div className={classes.resultsDiv}>
                <br/>
                    <GridList className={classes.gridList} cols={4} cellHeight={300} spacing={16}>
                        {results.map((result) => {
                            return (
                            <GridListTile key={result.id[0]._}>
                                <div width={'auto'} className={classes.div}>
                                <img src={result.best_book[0].image_url[0]} alt={result.best_book[0].title} />
                                </div>
                                <GridListTileBar
                                title={result.best_book[0].title}
                                subtitle={<span>by: {result.best_book[0].author[0].name[0]}</span>}
                                classes={{
                                    root: classes.titleBar,
                                }}
                                actionIcon={
                                    <IconButton aria-label={`info about ${result.best_book[0].title}`} className={classes.icon}>
                                    <InfoIcon />
                                    </IconButton>}
                            />
                            <GridListTileBar
                                classes={{
                                    root: classes.titleBarTop,
                                }}
                                titlePosition ={'top'}
                                actionIcon={
                                    <IconButton aria-label={`${result.id[0]._}`} onClick={() => _handleAddLibrary(result.id[0]._, result.best_book[0].title[0], result.best_book[0].author[0].name[0], result.best_book[0].image_url[0])}>
                                    {/*makes sure that the correct icon is displayed for clicked or not clicked*/}
                                    {clicks.includes(result.id[0]._) ? <BookmarkIcon fontSize="large" className={classes.title} /> : <BookmarkBorderIcon fontSize="large" className={classes.title} />}
                                    </IconButton> }
                            />
                            </GridListTile>
                            )})}
                    </GridList> 
                </div>
            </Container>
        </>
    );
}

export default Results;