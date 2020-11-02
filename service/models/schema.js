CREATE TABLE my_schema.table_name
(COLUMN NAME + DATA TYPE +
COLUMN CONSTRAINT [OPTIONAL]);

CREATE TABLE my_schema.users(
    ID   INT              NOT NULL,
    NAME VARCHAR (50)     NOT NULL,
    EMAIL  VARCHAR (50)   NOT NULL,
    PASSWORD VARCHAR (50)   NOT NULL,
    PRIMARY KEY (ID)
    );

CREATE TABLE my_schema.books(
    ID   INT              NOT NULL,
    TITLE VARCHAR (50)      NOT NULL,
    ISBN VARCHAR (13)   NOT NULL,
    GENRE_ID INT,
    AUTHOR_ID INT      NOT NULL,
    READER_ID INT,
    SERIES BOOLEAN,
    PRIMARY KEY (ID),
    FOREIGN KEY (GENRE_ID),
    FOREIGN KEY (AUTHOR_ID),
    FOREIGN KEY (READER_ID)
);
CREATE TABLE my_schema.genres(
    ID   INT              NOT NULL,
    GENRE VARCHAR (50)      NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE my_schema.authors(
    ID   INT              NOT NULL,
    AUTHOR VARCHAR (50)      NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE my_schema.readers(
    ID   INT              NOT NULL,
    READER VARCHAR (50)      NOT NULL,
    PRIMARY KEY (ID)
);
CREATE TABLE my_schema.shelves(
    ID   INT              NOT NULL,
    NAME VARCHAR (50)      NOT NULL,
    USER_ID INT              NOT NULL,
    BOOK_ID INT              NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID),
    FOREIGN KEY (BOOK_ID)
);
CREATE TABLE my_schema.groups(
    ID   INT              NOT NULL,
    NAME VARCHAR (50)      NOT NULL,
    USER_ID INT              NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID)
);
CREATE TABLE my_schema.ratings(
    ID   INT              NOT NULL,
    RATING INT      NOT NULL,
    USER_ID INT              NOT NULL,
    BOOK_ID INT              NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (USER_ID),
    FOREIGN KEY (BOOK_ID)
);