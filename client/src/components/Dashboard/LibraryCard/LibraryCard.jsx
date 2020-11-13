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
                // console.log('The library is', data)
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
    };

    
    // Finds screen width and updates the columns display
    const columnsSize = () => {
        const width = window.screen.width;
        let columns = 0;
        if (width >= '1100') {
            columns = 5;
        }  
        else if (width >= '800') {
            columns = 4;
        }  
        else if  (width >= '600') {
            columns = 3;
        }
        else if (width >= '450') {
            columns = 2;
        } 
        else if (width < '450') {
            columns = 1;
        }
        else {columns = 2;
        }
        return columns;
    }
    

    return (
        <>
            {(library.length !== 0) ?  
                <div className={classes.dashboardDiv}>
                <Typography variant="h6" className={classes.typography} key={library[0].id}><Link className={classes.link} to="/library">Your Main Library</Link></Typography>
                    <GridList className={classes.gridList} cols={library[0].Books.length !== 0 ? columnsSize() : 1} cellHeight={'auto'}> 
                        {(library[0].Books.length !== 0) ? (library[0].Books.map(book => { 
                            return (
                            <GridListTile cellHeight={'auto'} key={book.id}>
                            <br />
                            <div width={'auto'} className={classes.div}>
                                <img src={book.coverURL} alt={book.title} style={{height: '139px'}}/>
                            </div>
                            <br />
                            <Typography>{book.title}</Typography>
                            <br />
                            </GridListTile>
                        )})) : (
                        <Typography>You're don't have any books yet! <Link style={{color: '#52781e'}} to="/library">Start here.</Link></Typography>
                        )}
                    </GridList> 
                    <br />
                </div> : (
                <Typography>You're don't have any shelves yet!</Typography>
            )}
        </>
    )
}

export default LibraryCard;