import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, GridList, Typography }  from '@material-ui/core';

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
        color: '#fffff'
    },
    titleBarTop: {
        background: 'rgba(0, 43, 54, .001)',
        color: '#52781e',
    },
}));

const LibraryResults = (props) => {
    const classes = useStyles();
    // const [popoverId, setPopoverId] = useState(null);
    const [results, setResults] = useState(null);
    const { search, shelfId } = props.location.state;
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const { user } = useAuth0();
    console.log("search", search);
    console.log("shelf id", shelfId);

    useEffect(() => {
        (async function (){
            const data = {
                shelfId: 2,
                search: search,
                userId: user.sub
            }
            axios.get(`http://localhost:3000/library/search/${search}`, data)
                .then(res => {
                    console.log("response", res);
                    const data = res.data;
                    setResults(data);
                })
            })();
    }, [search, shelfId, user.sub]);    
    
    // const handleClick = (event, popoverId) => {
    //     setPopoverId(popoverId);
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setPopoverId(null);
    //     setAnchorEl(null);
    // };

    if (search === null) {
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
            <Typography variant="h6">Add books to your library from here</Typography>
            <br />
                <div className={classes.resultsDiv}>
                <br/>
                    <GridList className={classes.gridList} cols={4} cellHeight={300} spacing={16}>
                        {/* {results.map((result) => {
                            return (
                            <GridListTile key={result.key}>
                                <div width={'auto'} className={classes.div}>
                                    <img src={`http://covers.openlibrary.org/b/isbn/${result.isbn}-M.jpg`} alt={result.cover_i} />
                                </div>
                                <GridListTileBar
                                title={result.title}
                                subtitle={<span>by: {result.author_name}</span>}
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
                                vertical: 'bottom',
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
                            <Typography className={classes.typography}>
                                Author: {result.author_name}
                            </Typography>
                            <Typography className={classes.typography}>
                                Genre: (update with API data)
                            </Typography>
                            <Typography className={classes.typography}>
                                Reader: (update with API data)
                            </Typography>
                        </Popover>
                            <GridListTileBar
                                classes={{
                                    root: classes.titleBarTop,
                                }}
                                titlePosition ={'top'}
                                actionIcon={
                                    <IconButton aria-label={`${result.key}`} >
                                        <BookmarkIcon fontSize="large" className={classes.title} /> 
                                    </IconButton> 
                                }
                            />
                            </GridListTile>
                            )})} */}
                    </GridList> 
                </div>
            </Container>
        </>
    );
}

export default LibraryResults;