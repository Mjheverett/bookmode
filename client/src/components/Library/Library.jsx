import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Container, GridList, GridListTile, GridListTileBar, Popover, Typography, Button, InputBase }  from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import CustomizedMenus from './BookMenu';

const useStyles = makeStyles((theme) => ({
    libraryDiv:{
        position: 'relative',
        borderRadius: '5px',
        background: '#768B91',
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
        maxWidth: "600px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            marginLeft: 0,
        },
    },
    librarySearch: {
        position: 'relative',
        maxWidth: "215px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.15),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            marginLeft: 0,
        },
    },
    margin: {
        margin: theme.spacing(2),
    },
    titleBarTop: {
        background: 'rgba(0, 43, 54, .001)',
        color: '#52781e',
    },
}));

const Library = () => {
    const classes = useStyles();
    const [library, setLibrary] = useState(null);
    const [popoverId, setPopoverId] = useState(null);
    const [name, setShelfName] = useState('');
    const [description, setShelfDescription] = useState('');
    const [search, setSearch] = useState();
    const [fireRedirect, setRedirect] = useState(false);
    const [users, setUsers] = useState([]);
    const { user } = useAuth0();
    const url = `http://localhost:3000/users`
    //gets shelves and respective books/authors
    useEffect(() => {
        axios.get(`http://localhost:3000/library/${user.sub}`)
            .then(res => {
                const data = res.data;
                console.log('library data: ', data)
                setLibrary(data)
            });
        axios.get(url)
            .then(res => {
                const data = res.data;
                console.log('res.data:', data)
                setUsers(data)
            });
    }, [user.sub]);

    // popover with information about each book.
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event, popoverId) => {
        setPopoverId(popoverId);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setPopoverId(null);
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // Create Shelf Functions
    const _handleNameChange = (data) => {
        setShelfName(data);
    };
    const _handleDescChange = (data) => {
        setShelfDescription(data);
    };

    //function for adding the shelf named/described above
    const _handleCreateShelf = (e) => {
        e.preventDefault();
        const data = {
            shelfName: name,
            shelfDescription: description
        };
        axios.post(`http://localhost:3000/library/add/${user.sub}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        const newShelf = {
            shelfName: name,
            shelfDescription: description,
            Books: []
        }
        setLibrary([...library, newShelf]);
        setShelfName('');
        setShelfDescription('');
    }

    // Library Search Functions
    const _handleChange = (search) => {
        console.log(search)
        setSearch(search);
    };
    const _handleSubmit = (e) => {
        e.preventDefault();
        setRedirect(true)
    };

    // Render Loading while pulling Library Info
    if (library === null) {
        return (
            <>
                <Typography variant="h6">Loading</Typography>
            </>
        )
    };

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
                <Typography variant="h2">Library</Typography>
                <br/>
                <div className={classes.librarySearch}>
                    <form onSubmit={e => _handleSubmit(e)}>
                        <InputBase style={{color: '#93A1A1', paddingLeft: '6px'}}
                            placeholder="Search your library..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search'}}
                            onChange={(event) => _handleChange(event.target.value)} 
                        />
                    </form>
                    {fireRedirect && search && (
                        <Redirect 
                            to={{
                                pathname: `/library/results/${search}`,
                                state: {search: search}
                            }}
                        />
                    )}
                </div>
                <br/>
                <Typography variant="h6">
                    Are you a fan of creating shelves?
                </Typography>
                <br />
                <Typography>
                    <form onSubmit={_handleCreateShelf}>
                        <label>Shelf Name
                            <div className={classes.search}>
                                <InputBase 
                                    style={{color: '#93A1A1'}}
                                    placeholder="Awesome Shelf Name..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    name='shelfName' 
                                    onChange={(event) => _handleNameChange(event.target.value)}
                                    value={name}
                                />
                            </div>
                        </label>
                        <br />
                        <label>Shelf Description
                        <div className={classes.search}>
                                <InputBase
                                    style={{color: '#93A1A1'}}
                                    placeholder="Shelf Description..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    name='shelfDescription'
                                    onChange={(event) => _handleDescChange(event.target.value)}
                                    value={description}
                                />
                        </div>
                        </label>
                        <br/>
                        <Button type="submit" color="secondary" aria-describedby={id} variant="contained" size="large">Create New Shelf</Button>
                        <Button type="button" color="secondary" aria-describedby={id} variant="outlined" size="large" className={classes.margin}>Cancel</Button>
                    </form>
                </Typography>
                <br />
                {(library.length !== 0) ? (library.map(shelf => (
                    <div>
                    <Typography variant="h6" key={shelf.id}>{shelf.shelfName}</Typography>
                    <br />
                    <div className={classes.libraryDiv}>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                        {(shelf.Books.length !== 0) ? (shelf.Books.slice(0).reverse().map(book => { 
                            return (
                            <GridListTile cellHeight={'auto'} key={book.id}>
                            <br />
                            <div width={'auto'} className={classes.div}>
                                <img src={book.coverURL} alt={book.title} style={{height: '139px'}}/>
                            </div>
                            <br />
                            <GridListTileBar
                                classes={{
                                    root: classes.titleBarTop,
                                }}
                                titlePosition ={'top'}
                                actionIcon={
                                    <CustomizedMenus users={users} book={book} shelves={library.slice(1)}/>}
                            />
                            <Typography>{book.title}</Typography>
                            <div>
                            <br />
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
                                        vertical: 'top',
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
                                </Popover>
                            </div>
                            <br />
                        </GridListTile>)})) : (
                        <Typography>Add a book using the navbar search feature!</Typography>
                        )}
                    </GridList> 
                    </div>
                    <Typography style={{textAlign: 'end'}}>Scroll for More <span class="fas fa-long-arrow-alt-right"></span></Typography>
                    </div>))) : (
                    <Typography>You don't have any shelves yet!</Typography>
                )}
            </Container> 
        </>
    )
}
export default Library;
