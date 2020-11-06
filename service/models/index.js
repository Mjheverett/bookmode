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

db.authors.belongsToMany(db.books, { through: 'authors_books' });
db.books.belongsToMany(db.authors, { through: 'authors_books' });
db.readers.belongsToMany(db.books, { through: 'readers_books' });
db.books.belongsToMany(db.readers, { through: 'readers_books' });
db.media.hasMany(db.books);
db.books.belongsTo(db.media);
db.genres.hasMany(db.books);
db.books.belongsTo(db.genres);
db.users.hasMany(db.recommendations);
db.recommendations.belongsTo(db.users, {as: "sender"})
db.recommendations.belongsTo(db.users, {as: "receiver"})
db.books.hasMany(db.recommendations);
db.recommendations.belongsTo(db.books)
db.shelves.belongsToMany(db.books, { through: 'shelves_books' });
db.books.belongsToMany(db.shelves, { through: 'shelves_books' });
db.users.belongsToMany(db.groups, {
    through: "user_group",
});
db.groups.belongsToMany(db.users, {
    through: "user_group",
});
db.users.belongsToMany(db.shelves, {
    through: "user_shelves",
});
db.shelves.belongsToMany(db.users, {
    through: "user_shelves",
});
module.exports = db;
