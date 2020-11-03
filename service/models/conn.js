const host = process.env.DB_HOST,
    user = process.env.DB_USER,
    database = process.env.DB_DATABASE,
    password = process.env.DB_PWD;

const pgp = require('pg-promise')({
    query: function (e) {
        console.log('QUERY: ', e.query)
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password
}

const db = pgp(options)

module.exports = db;