import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, GridList, GridListTile, Popover, Typography, Button }  from '@material-ui/core';

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
        color: '#93A1A1',
        backgroundColor: '#EBEBEB',
    },
}));

const Library = () => {
    const [library, setLibrary] = useState({});
    const classes = useStyles();
    
    const libraryBooks = {
        "results": {
            "work": [
                {
                    "id": {
                        "_type": "integer",
                        "__text": "849585"
                    },
                    "books_count": {
                        "_type": "integer",
                        "__text": "403"
                    },
                    "ratings_count": {
                        "_type": "integer",
                        "__text": "1129530"
                    },
                    "text_reviews_count": {
                        "_type": "integer",
                        "__text": "25007"
                    },
                    "original_publication_year": {
                        "_type": "integer",
                        "__text": "1977"
                    },
                    "original_publication_month": {
                        "_type": "integer",
                        "__text": "1"
                    },
                    "original_publication_day": {
                        "_type": "integer",
                        "__text": "28"
                    },
                    "average_rating": "4.23",
                    "best_book": {
                        "id": {
                            "_type": "integer",
                            "__text": "11588"
                        },
                        "title": "The Shining",
                        "author": {
                            "id": {
                                "_type": "integer",
                                "__text": "3389"
                            },
                            "name": "Stephen King"
                        },
                        "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1353277730l/11588._SX98_.jpg",
                        "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1353277730l/11588._SY75_.jpg",
                        "_type": "Book"
                    }
                },
                {
                    "id": {
                        "_type": "integer",
                        "__text": "150259"
                    },
                    "books_count": {
                        "_type": "integer",
                        "__text": "131"
                    },
                    "ratings_count": {
                        "_type": "integer",
                        "__text": "804461"
                    },
                    "text_reviews_count": {
                        "_type": "integer",
                        "__text": "25632"
                    },
                    "original_publication_year": {
                        "_type": "integer",
                        "__text": "1986"
                    },
                    "original_publication_month": {
                        "_type": "integer",
                        "__text": "9"
                    },
                    "original_publication_day": {
                        "_type": "integer",
                        "__text": "15"
                    },
                    "average_rating": "4.24",
                    "best_book": {
                        "id": {
                            "_type": "integer",
                            "__text": "830502"
                        },
                        "title": "It",
                        "author": {
                            "id": {
                                "_type": "integer",
                                "__text": "3389"
                            },
                            "name": "Stephen King"
                        },
                        "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1334416842l/830502._SY160_.jpg",
                        "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1334416842l/830502._SY75_.jpg",
                        "_type": "Book"
                    }
                },
                {
                    "id": {
                        "_type": "integer",
                        "__text": "46575"
                    },
                    "books_count": {
                        "_type": "integer",
                        "__text": "291"
                    },
                    "ratings_count": {
                        "_type": "integer",
                        "__text": "515813"
                    },
                    "text_reviews_count": {
                        "_type": "integer",
                        "__text": "19064"
                    },
                    "original_publication_year": {
                        "_type": "integer",
                        "__text": "1982"
                    },
                    "original_publication_month": {
                        "_type": "integer",
                        "__text": "6"
                    },
                    "original_publication_day": {
                        "_type": "integer",
                        "__text": "1"
                    },
                    "average_rating": "3.95",
                    "best_book": {
                        "id": {
                            "_type": "integer",
                            "__text": "43615"
                        },
                        "title": "The Gunslinger",
                        "author": {
                            "id": {
                                "_type": "integer",
                                "__text": "3389"
                            },
                            "name": "Stephen King"
                        },
                        "image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1554220416l/43615._SX98_.jpg",
                        "small_image_url": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1554220416l/43615._SY75_.jpg",
                        "_type": "Book"
                    }
                }
            ]
        }
    };


    useEffect(() => {
        setLibrary(libraryBooks);
    }, []);

    // Modal with information about each book.

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
        
            <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <Typography variant="h2">Library</Typography>
                <br />
                <Typography variant="h6">Shelf</Typography>
                <br />
                <div className={classes.libraryDiv}>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                        <GridListTile cellHeight={'auto'}>
                            <br />
                                <div width={'auto'} className={classes.div}>
                                    <img src={libraryBooks.results.work[0].best_book.image_url} alt={libraryBooks.results.work[0].best_book.title}/>
                                </div>
                            <br />
                            <div>
                                <Button color="secondary" aria-describedby={id} variant="contained" size="large" onClick={handleClick}>
                                More Information
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
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
                                        Title: {libraryBooks.results.work[0].best_book.title}
                                    </Typography>
                                    <Typography className={classes.typography}>
                                        Author: {libraryBooks.results.work[0].best_book.author.name}
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
                        </GridListTile>
                        <GridListTile cellHeight={'auto'}>
                            <br />
                                <div width={'auto'} className={classes.div}>
                                    <img src={libraryBooks.results.work[1].best_book.image_url} alt={libraryBooks.results.work[1].best_book.title}/>
                                </div>
                            <br />
                            <div>
                                <Button color="secondary" aria-describedby={id} variant="contained" size="large" onClick={handleClick}>
                                More Information
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
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
                                        Title: {libraryBooks.results.work[1].best_book.title}
                                    </Typography>
                                    <Typography className={classes.typography}>
                                        Author: {libraryBooks.results.work[1].best_book.author.name}
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
                        </GridListTile>
                        <GridListTile cellHeight={'auto'}>
                            <br />
                                <div width={'auto'} className={classes.div}>
                                    <img src={libraryBooks.results.work[2].best_book.image_url} alt={libraryBooks.results.work[2].best_book.title}/>
                                </div>
                            <br />
                            <div>
                                <Button color="secondary" aria-describedby={id} variant="contained" size="large" onClick={handleClick}>
                                More Information
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
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
                                        Title: {libraryBooks.results.work[2].best_book.title}
                                    </Typography>
                                    <Typography className={classes.typography}>
                                        Author: {libraryBooks.results.work[2].best_book.author.name}
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
                        </GridListTile>
                    </GridList> 
                </div>

                <br />
                <Typography variant="h6">Shelf</Typography>
                <br />
                <div className={classes.libraryDiv}>
                    <GridList className={classes.gridList} cols={2} cellHeight={'auto'}>
                        <GridListTile cellHeight={'auto'}>
                            <br />
                                <div width={'auto'} className={classes.div}>
                                    <img src={libraryBooks.results.work[0].best_book.image_url} alt={libraryBooks.results.work[0].best_book.title}/>
                                </div>
                            <br />
                            <div>
                                <Button color="secondary" aria-describedby={id} variant="contained" size="large" onClick={handleClick}>
                                More Information
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
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
                                        Title: {libraryBooks.results.work[0].best_book.title}
                                    </Typography>
                                    <Typography className={classes.typography}>
                                        Author: {libraryBooks.results.work[0].best_book.author.name}
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
                        </GridListTile>
                        <GridListTile cellHeight={'auto'}>
                            <br />
                                <div width={'auto'} className={classes.div}>
                                    <img src={libraryBooks.results.work[1].best_book.image_url} alt={libraryBooks.results.work[1].best_book.title}/>
                                </div>
                            <br />
                            <div>
                                <Button color="secondary" aria-describedby={id} variant="contained" size="large" onClick={handleClick}>
                                More Information
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
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
                                        Title: {libraryBooks.results.work[1].best_book.title}
                                    </Typography>
                                    <Typography className={classes.typography}>
                                        Author: {libraryBooks.results.work[1].best_book.author.name}
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
                        </GridListTile>
                        <GridListTile cellHeight={'auto'}>
                            <br />
                                <div width={'auto'} className={classes.div}>
                                    <img src={libraryBooks.results.work[2].best_book.image_url} alt={libraryBooks.results.work[2].best_book.title}/>
                                </div>
                                <br />
                            <div>
                                <Button color="secondary" aria-describedby={id} variant="contained" size="large" onClick={handleClick}>
                                More Information
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
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
                                        Title: {libraryBooks.results.work[2].best_book.title}
                                    </Typography>
                                    <Typography className={classes.typography}>
                                        Author: {libraryBooks.results.work[2].best_book.author.name}
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
                        </GridListTile>
                    </GridList> 
                    
                </div>
               
              
            </Container>

            <div>
                <p>Are you a fan of creating shelves? Well, have I got a form for you!!</p> 
                <form action={`http://localhost:3000/library/add`} method='POST'>
                    <label>post title
                        <input name='shelfName' />
                    </label>
                    <label>shelf description
                        <textarea name='shelfDescription' />
                    </label>
                    <button type='submit'>comment</button>
                </form>
            </div>
        </>
    )
}

export default Library;
