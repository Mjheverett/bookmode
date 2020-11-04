import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from "styled-components";

const LibraryDiv = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    background: #EBEBEB;
    box-shadow: inset -12px -12px 30px #ffffff, inset 12px 12px 30px #c8c8c8;
    text-align: center;
    color: #93A1A1;
    padding: 0.8rem 1.6rem;
    margin-bottom: 2rem;
`;

// const LibraryDivDark = styled.div`
//     position: relative;
//     height: 100%;
//     width: 100%;
//     border-radius: 5px;
//     background: #002B36;
//     box-shadow: inset -12px -12px 30px #003746, inset 12px 12px 30px #001f26;
//     text-align: center;
//     color: #6A6B7A;
//     padding: 0.8rem 1.6rem;
//     font-weight: bold;
//     font-size: 2.4rem;
//     margin-bottom: 2rem;
// `;


const Library = () => {
    const [library, setLibrary] = useState({});
    
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

    return (
        <>
            <Grid 
            container
            direction="row"
            justify="space-evenly"
            alignItems="center">
                <Grid item>
                    <h1>Library</h1>
                    <br />
                    <LibraryDiv>
                        <div>
                            <h3>{libraryBooks.results.work[0].best_book.title}</h3>
                            <p>{libraryBooks.results.work[0].best_book.author.name}</p>
                            <p>Genre (update with API data)</p>
                            <img src={libraryBooks.results.work[0].best_book.image_url} alt={libraryBooks.results.work[0].best_book.title}/>
                            <p>Reader (update with API data if available)</p>
                        </div>
                    </LibraryDiv>
                    <LibraryDiv>
                    <p>{libraryBooks.results.work[1].best_book.title}</p>
                        <p>{libraryBooks.results.work[1].best_book.author.name}</p>
                        <p>Genre (update with API data)</p>
                        <img src={libraryBooks.results.work[1].best_book.image_url} alt={libraryBooks.results.work[0].best_book.title}/>
                        <p>Reader (update with API data if available)</p>
                    </LibraryDiv>
                </Grid>
            </Grid>
        </>
    )
}

export default Library;
