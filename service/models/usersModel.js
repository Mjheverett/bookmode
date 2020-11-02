const db = require("./conn"),
    bcrypt = require('bcryptjs');

class UsersList {
    constructor(id, name, email, password) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }
    async checkPassword(hashedPassword) {
        //returns a TRUE or FALSE statement
        return bcrypt.compareSync(this.password, hashedPassword);
    }
    //add new USER
    async save() {
        try {
            console.log('Issue');
            const response = await db.one(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;`, [this.name, this.email, this.password]);
            return response;
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }
    //login USER
    async login() {
        try {
            const response = await db.one(`SELECT id, name, email, password FROM users WHERE name = $1;`, [this.name]);
            const isValid = await this.checkPassword(response.password)
            if (!!isValid) {
                const {
                    name,
                    id
                } = response;
                return {
                    isValid,
                    name,
                    user_id: id
                };
            } else {
                return {
                    isValid
                }
            }
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }
    //delete USER
    static async removeUser(id) {
        try {
            const response = await db.result(
                `
                DELETE FROM groups USING users WHERE groups.user_id = users.id AND users.id = $1;
                DELETE FROM shelves USING users WHERE shelves.user_id = users.id AND users.id = $1;
                DELETE FROM ratings USING users WHERE ratings.user_id = users.id AND users.id = $1;
                DELETE FROM users WHERE id=$1;`,
                [id]
            );
            return response;
        } catch (error) {
            console.error('ERROR: ', error.message);
            return error.message;
        }
    }
}

module.exports = UsersList;