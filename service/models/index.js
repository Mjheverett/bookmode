const { Sequelize } = require('sequelize');
const { DataTypes } = require("sequelize");


const sequelize = new Sequelize('postgres://jkveaiom:hwIiKYqHiUAR3_917dvIZRGvfsliF4YR@lallah.db.elephantsql.com:5432/jkveaiom')

const Group = sequelize.define('Group', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    groupName: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    groupDescription: {
        type: DataTypes.STRING(1234),
    },
    });
const Author = sequelize.define('Author', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    authorName: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    });
const Genre = sequelize.define('Genre', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    genreName: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    });
const Reader = sequelize.define('Reader', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    readerName: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    });
const Media = sequelize.define('Media', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    });
const Book = sequelize.define('Book', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    authorID: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Author,
            // This is the column name of the referenced model
            key: 'id',
        }
    },
    mediaType: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Media,
            // This is the column name of the referenced model
            key: 'id',
        }
    },
    publicationDate: {
        type: DataTypes.STRING(1234),
    },
    coverURL: {
        type: DataTypes.STRING(1234),
    },
    readerID: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Reader,
            // This is the column name of the referenced model
            key: 'id',
        }
    },
    isbn: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    length: {
        type: DataTypes.STRING(1234),
    },
    isSeries: {
        type: DataTypes.BOOLEAN
    },
    genreID: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Genre,
            // This is the column name of the referenced model
            key: 'id',
        }
    },
    subgenre: {
        type: DataTypes.STRING,
    }
    });
const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.STRING(1234),
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    groups: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Group,
            // This is the column name of the referenced model
            key: 'id',
        }
    },
    });
const Recommendation = sequelize.define('Recommendation', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sendingUserID: {
        type: DataTypes.STRING(1234),
        allowNull: false,
        references: {
            // This is a reference to another model
            model: User,
            // This is the column name of the referenced model
            key: 'id',
            }
        },
    receivingUserID: {
        type: DataTypes.STRING(1234),
        allowNull: false,
        references: {
            // This is a reference to another model
            model: User,
            // This is the column name of the referenced model
            key: 'id',
            }
        },
    comment: {
        type: DataTypes.STRING(1234),
    },
    bookID: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Book,
            // This is the column name of the referenced model
            key: 'id',
        }
    },
    });
const Shelf = sequelize.define('Shelf', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shelfName: {
        type: DataTypes.STRING(1234),
        defaultValue: 'General'
        },
    shelfDescription: {
        type: DataTypes.STRING(1234),
    }, 
    userID: {
        type: DataTypes.STRING(1234),
        allowNull: false,
        references: {
            // This is a reference to another model
            model: User,
            // This is the column name of the referenced model
            key: 'id',
        }
    }
    }, {
        tableName: 'Shelves'
    });
console.log(User === sequelize.models.User); // true
console.log(Group === sequelize.models.Group); // true
console.log(Shelf === sequelize.models.Shelf); // true
console.log(Book === sequelize.models.Book); // true
console.log(Author === sequelize.models.Author); // true
console.log(Reader === sequelize.models.Reader); // true
console.log(Media === sequelize.models.Media); // true
console.log(Genre === sequelize.models.Genre); // true
console.log(Recommendation === sequelize.models.Recommendation); // true
//populate the database with your seed values!
const seed = async () => { 
    await sequelize.sync({force: true}) //sync to your database!  
    const ebook = await Media.create({ type: "e-book" });
    const hardcover = await Media.create({ type: "hardcover" })
    const paperback = await Media.create({ type: "paperback" })
    const audiobook = await Media.create({ type: "audiobook" })
    sequelize.close() //close your db connection 
    console.log('Seed Successful!') //everything is working correctly!
    }
  seed() //initialize the sync!



module.exports = sequelize