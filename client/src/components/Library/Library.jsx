import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, GridList, GridListTile, Popover, Typography, Button, InputBase }  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    libraryDiv:{
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
    typography: {
        padding: theme.spacing(2),
        alignItems: 'center',
        color: '#002B36',
        backgroundColor: '#768B91',
    },
    inputRoot: {
        color: 'primary',
    },
    inputInput: {
        padding: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
        marginLeft: 0,
        [theme.breakpoints.up('md')]: {
            width: '100ch',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
            marginLeft: 0,
        },
    },
    margin: {
        margin: theme.spacing(2),
    },
}));

const Library = () => {
    const [library, setLibrary] = useState(null);
    const [popoverId, setPopoverId] = useState(null);
    const [name, setShelfName] = useState('');
    const [description, setShelfDescription] = useState('');
    const classes = useStyles();

    useEffect(() => {
        axios.get('http://localhost:3000/library')
            .then(res => {
                const data = res.data;
                console.log('res.data:', data)
                setLibrary(data)
            });
    }, []);

    // Modal with information about each book.
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event, popoverId) => {
        setPopoverId(popoverId);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setPopoverId(null);
        setAnchorEl(null);
    };

    const _handleNameChange = (data) => {
        console.log(data)
        setShelfName(data);
    };

    const _handleDescChange = (data) => {
        console.log(data)
        setShelfDescription(data);
    };

    const _handleCreateShelf = (e) => {
        e.preventDefault();
        const data = {
            shelfName: name,
            shelfDescription: description
        };
        axios.post('http://localhost:3000/library/add', data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    if (library === null) {
        return 'Loading...';
    }
return (
<>
    <Container maxWidth="lg" style={{marginTop: '2rem'}}>
        <Typography variant="h2">Library</Typography>
        <Typography variant="h6">
            Are you a fan of creating shelves? Well, have we got a form for you!!
        </Typography>
        <br />
        <Button type="button" color="secondary" aria-describedby={id} variant="contained" size="large">
            Add Shelf
        </Button>
        <br />
        <br />
        <Typography>
            <form onSubmit={_handleCreateShelf}>
                <label>Shelf Name
                    <div className={classes.search}>
                        <InputBase style={{color: '#93A1A1'}}
                            placeholder="Type here..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            name='shelfName' 
                            onChange={(event) => _handleNameChange(event.target.value)} 
                        />
                    </div>
                </label>
                <br />
                <label>Shelf Description
                <div className={classes.search}>
                        <InputBase
                            style={{color: '#93A1A1'}}
                            placeholder="Type here..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            name='shelfDescription'
                            onChange={(event) => _handleDescChange(event.target.value)} 
                        />
                </div>
                </label>
                <br/>
                <Button type="submit" color="secondary" aria-describedby={id} variant="contained" size="large">Create New Shelf</Button>
                <Button type="button" className={classes.margin} color="secondary" aria-describedby={id} variant="outlined" size="large">Cancel</Button>
            </form>
        </Typography>
        <br />
        {(library.length !== 0) ? (library.map(shelf => (
            <div>
            <Typography variant="h6">{shelf.shelfName}</Typography>
            <br />
            <div className={classes.libraryDiv}>
            <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                {(shelf.Books.length !== 0) ? (shelf.Books.map(book => { 
                    return (
                    <GridListTile cellHeight={'auto'} key={book.id}>
                    <br />
                    <div width={'auto'} className={classes.div}>
                        <img src={book.coverURL} alt={book.title}/>
                    </div>
                    <br />
                    <p>{book.title}</p>
                    <div>
                        <Button color="secondary" aria-describedby={book.id} variant="contained" size="large" onClick={(e) => handleClick(e, book.id)}>
                            More Information
                        </Button>
                        <Popover
                            id={book.id}
                            open={popoverId === book.id}
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
                                Title: {book.title}
                            </Typography>
                            <Typography className={classes.typography}>
                                Author: {book.Authors[0].authorName}
                            </Typography>
                            <Typography className={classes.typography}>
                                Genre: (update with API data)
                            </Typography>
                            <Typography className={classes.typography}>
                                Reader: (update with API data)
                            </Typography>
                        </Popover>
                    </div>
                    <br />
                    </GridListTile>)})) : (
                    <p>No books!!</p>
                            )}
                    </GridList> 
                    </div>
                    </div>))) : (
                    <p>No Shelves!</p>
                )}
        </Container> 
    </>
    )
}

export default Library;
