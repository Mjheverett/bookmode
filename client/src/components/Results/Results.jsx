import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { loadData } from '../../utils/loadData';
import { parseData } from '../../utils/parseData';
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
    const [input, setInput] = useState([]);
    const { data } = props.location.state
    
    console.log(props);
    
    useEffect(() => {
        const key = process.env.REACT_APP_GOODREADS_KEY;
        axios.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${key}&q=${input}&page=1&search=all`)
            .then(res => {
                const data = res.data;
                console.log("data is:", data);
            })
        
    }, [input]);
    
    const classes = useStyles();
    
    const _handleAddLibrary = (stateItem) =>{
        setClicked(true)
        // console.log("state", JSON.stringify(stateItem));
        //     fetch("http://localhost:5432/", {
        //     method: 'POST',
        //     body: JSON.stringify(stateItem),
        //     headers: {
        //         'Content-Type': 'application/json'},
        //     })
        //     .then((response) => response.json)
        //     .then((data) => {
        //         console.log('data:', data)
        //     });
        }

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {/* {data.map((result) => (
                <GridListTile key={result.img}>
                    <img src={result.img} alt={result.title} />
                    <GridListTileBar
                    title={result.title}
                    classes={{
                        root: classes.titleBar,
                        title: classes.title,
                    }}
                    actionIcon={
                        <IconButton aria-label={`star ${result.title}`} onClick={_handleAddLibrary()}>
                        {clicked ? <StarIcon /> : <StarBorderIcon className={classes.title} />}<StarBorderIcon className={classes.title} 
                        onClick={_handleAddLibrary}/>
                        </IconButton>
                    }
                    />
                </GridListTile>
                ))} */}
            </GridList>
        </div>
    );
}

export default Results;