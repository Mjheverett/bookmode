import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import InfoIcon from '@material-ui/icons/Info';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    div: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: '20%'
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
    background: 'rgba(0, 43, 54, .7)',
    color: '#EBEBEB'
    //     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    titleBarTop: {
        background: 'rgba(0, 43, 54, .001)',
        color: '#EBEBEB'
        //     'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
    icon: {
        color: 'rgba(235, 235, 235, 0.54)',
      },
}));
const Results = (props) => {
    const [clicks, setClicks] = useState([])
    const [results, setResults] = useState(null);
    const { data } = props.location.state;
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
    }, [setResults]);    
    const classes = useStyles();
    if (results === null) {
        return 'Loading...';
    }
    const _handleAddLibrary = (id) =>{
        //adds the ID of the clicked item to the array if it isn't there and removes from array if it is there
        let result =  clicks.includes(id) ? clicks.filter(click => click != id): [...clicks, id]
        setClicks(result)
        }

    return (
        <div className={classes.root}>
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
                            <IconButton aria-label={`${result.id[0]._}`} onClick={() => _handleAddLibrary(result.id[0]._)}>
                            {/*makes sure that the correct icon is displayed for clicked or not clicked*/}
                            {clicks.includes(result.id[0]._) ? <BookmarkIcon fontSize="large" className={classes.title} /> : <BookmarkBorderIcon fontSize="large" className={classes.title} />}
                            </IconButton> }
                    />
                    </GridListTile>
                    )})}
            </GridList> 
        </div>
    );
}

export default Results;