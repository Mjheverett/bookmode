import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));
const Results = (props) => {
    const [clicked, setClicked] = useState(false);
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
    const _handleAddLibrary = (stateItem) =>{
        setClicked(true)
        }

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={1.5} cellHeight={400}> 
                {results.map((result) => {
                    return (
                    <GridListTile key={result.id[0]._}>
                        <p>{result.best_book[0].title}</p>
                        <img height={400} width={auto} src={result.best_book[0].image_url[0]} alt={result.best_book[0].title} />
                        {/* 
                        <GridListTileBar
                        title={result.best_book[0].title}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionIcon={
                            <IconButton aria-label={`star ${result.best_book[0].title}`} onClick={_handleAddLibrary()}>
                            {clicked ? <StarIcon /> : <StarBorderIcon className={classes.title} />}<StarBorderIcon className={classes.title} 
                            onClick={_handleAddLibrary}/>
                            </IconButton> }
                        */}
                    </GridListTile>
                    )})}
            </GridList> 
        </div>
    );
}

export default Results;