import React, { useState } from 'react';

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
            <h1>Library</h1>
            <p>{libraryBooks.results.work[0].best_book.title}</p>
            <p>{libraryBooks.results.work[1].best_book.title}</p>
            <p>{libraryBooks.results.work[2].best_book.title}</p>
        </>
    )
}

export default Library;
