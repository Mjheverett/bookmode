import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, Typography }  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dashboardDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
        boxShadow: 'inset -12px -12px 30px #A5C3CB, inset 12px 12px 30px #475357',
        textAlign: 'center',
        color: '#002B36',
        padding: '0.8rem 1.6rem',
        marginBottom: '2rem',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    typography: {
        padding: theme.spacing(2),
        alignItems: 'center',
        color: '#002B36',
    },
    link: {
        color: '#002B36',
    },
}));

const LibraryCard = () => {
    const classes = useStyles();
    const [library, setLibrary] = useState(null);
    const { user } = useAuth0();

    useEffect(() => {
        axios.get(`http://localhost:3000/library/${user.sub}`)
            .then(res => {
                const data = res.data;
                // console.log('res.data:', data)
                setLibrary(data);
            })
            .catch(err => console.log(err));
    }, [user.sub]);

     if (library === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    }

    return (
        <>
            {(library.length !== 0) ? (library.map(shelf => (
                <div className={classes.dashboardDiv}>
                <Typography variant="h6" className={classes.typography}><Link className={classes.link} to="/library">Your Main Library</Link></Typography>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                        {(shelf.Books.length !== 0) ? (shelf.Books.map(book => { 
                            return (
                            <GridListTile cellHeight={'auto'} key={book.id}>
                            <br />
                            <div width={'auto'} className={classes.div}>
                                <img src={book.coverURL} alt={book.title} style={{height: '139px'}}/>
                            </div>
                            <br />
                            <Typography>{book.title}</Typography>
                            <br />
                            </GridListTile>)})) : (
                            <Typography>No books!!</Typography>
                                    )}
                    </GridList> 
                </div>))) : (
                <Typography>No Shelves!</Typography>
            )}
        </>
    )
}

export default LibraryCard;