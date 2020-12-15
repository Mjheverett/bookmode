'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.authors = require('./authors.model')(sequelize, Sequelize);
db.books = require('./books.model')(sequelize, Sequelize);
db.genres = require('./genres.model')(sequelize, Sequelize);
db.groups = require('./groups.model')(sequelize, Sequelize);
db.media = require('./media.model')(sequelize, Sequelize);
db.readers = require('./readers.model')(sequelize, Sequelize);
db.recommendations = require('./recommendations.model')(sequelize, Sequelize);
db.shelves = require('./shelves.model')(sequelize, Sequelize);
db.users = require('./users.model')(sequelize, Sequelize);
db.user_group = require('./user_group.model')(sequelize, Sequelize);
db.comments = require('./comment.model')(sequelize, Sequelize);
db.shelves_books = require('./shelves_books.model')(sequelize, Sequelize);

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
db.comments.belongsToMany(db.books, { through: 'comments_books' });
db.books.belongsToMany(db.comments, { through: 'comments_books' });
db.groups.hasMany(db.comments);
db.comments.belongsTo(db.groups);
db.comments.belongsToMany(db.users, { through: 'user_comments' });
db.users.belongsToMany(db.comments, { through: 'user_comments' });
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
