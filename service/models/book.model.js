module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        publicationDate: {
            type: DataTypes.STRING(1234),
        },
        coverURL: {
            type: DataTypes.STRING(1234),
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
        subgenre: {
            type: DataTypes.STRING,
        }
        });
    
        return Book;
    };