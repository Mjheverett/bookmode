module.exports = (sequelize, DataTypes) => {
    const shelves_books = sequelize.define('shelves_books', {
            // Model attributes are defined here
}, {
    tableName: 'shelves_books'
});

return shelves_books;
};
