const dbConfig = require('../config/config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://jkveaiom:hwIiKYqHiUAR3_917dvIZRGvfsliF4YR@lallah.db.elephantsql.com:5432/jkveaiom');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.authors = require('./author.model')(sequelize, Sequelize);
db.books = require('./book.model')(sequelize, Sequelize);
db.genres = require('./genre.model')(sequelize, Sequelize);
db.groups = require('./group.model')(sequelize, Sequelize);
db.media = require('./media.model')(sequelize, Sequelize);
db.readers = require('./reader.model')(sequelize, Sequelize);
db.recommendations = require('./recommendation.model')(sequelize, Sequelize);
db.shelves = require('./shelf.model')(sequelize, Sequelize);
db.users = require('./user.model')(sequelize, Sequelize);


db.authors.hasMany(db.books, { as: "authors-books" });
db.books.hasMany(db.authors, {
    foreignKey: "authorId",
    as: "author",
});
db.media.hasMany(db.books, { as: "media-books" });
db.books.belongsTo(db.media, {
    foreignKey: "mediaId",
    as: "mediaType",
});
db.readers.hasMany(db.books, { as: "reader-books" });
db.books.belongsTo(db.readers, {
    foreignKey: "readerId",
    as: "reader",
});
db.genres.hasMany(db.books, { as: "genre-books" });
db.books.belongsTo(db.genres, {
    foreignKey: "genreId",
    as: "genre",
});
db.users.hasMany(db.recommendations, {as: "user-recommendations"});
db.recommendations.belongsTo(db.users, {
    foreignKey: "sendingUserId",
    as: "sendingUser"
})
db.recommendations.belongsTo(db.users, {
    foreignKey: "receivingUserId",
    as: "receivingUser"
})
db.books.hasMany(db.recommendations, {as: "book-recommendations"});
db.recommendations.belongsTo(db.books, {
    foreignKey: "bookId",
})
db.books.hasMany(db.shelves, {as: "shelves"});
db.shelves.belongsToMany(db.books, {
    foreignKey: "bookId",
    as: 'books'
})
db.users.belongsToMany(db.groups, {
    through: "user_group",
    as: "userInGroup",
    foreignKey: "group_id",
});
db.groups.belongsToMany(db.users, {
    through: "user_group",
    as: "group",
    foreignKey: "user_id",
});
db.users.belongsToMany(db.shelves, {
    through: "user_shelves",
    as: "userForShelf",
    foreignKey: "shelf_id",
});
db.shelves.belongsToMany(db.users, {
    through: "user_shelves",
    as: "shelvesForUsers",
    foreignKey: "user_id",
});
module.exports = db;
