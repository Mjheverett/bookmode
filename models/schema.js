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
    SERIES BOOLEAN,
    INFO VARCHAR (250),
    PRIMARY KEY (ID),
    FOREIGN KEY (GENRE_ID),
    FOREIGN KEY (AUTHOR_ID)
)
CREATE TABLE my_schema.genres(
    ID   INT              NOT NULL,
    GENRE VARCHAR (50)      NOT NULL,
    PRIMARY KEY (ID)
)
CREATE TABLE my_schema.authors(
    ID   INT              NOT NULL,
    AUTHOR VARCHAR (50)      NOT NULL,
    PRIMARY KEY (ID)
)
CREATE TABLE my_schema.shelves(
    ID   INT              NOT NULL,
    AUTHOR VARCHAR (50)      NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (GENRE_ID),
    FOREIGN KEY (AUTHOR_ID)
)