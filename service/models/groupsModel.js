const { response } = require("express");
const db = require("./conn");

class GroupsList {
    constructor(id, name, user_id) {
        this.id = id;
        this.name = name;
        this.user_id = user_id;
    }
    
    //get all groups
    static async getAllGroups() {
        try {
            const response = await db.any(`SELECT * FROM groups;`);
            return response;
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }
    //get users groups
    static async getUserGroups(user_id) {
        user_id = 2;
        try {
            const response = await db.any(`SELECT * FROM groups WHERE user_id = $1;`, [user_id]);
            return response;
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }
    //get group details
    static async getGroupDetails(group_id) {
        try {
            const response = await db.one(`SELECT * FROM groups WHERE id = $1;`, [group_id]);
            return response;
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }
    //create new group
    static async createGroup(data, user_id) {
        try {
            const response = await db.result(`INSERT INTO groups (name, user_id) VALUES($1, $2);`, [data.name, user_id]);
            return response;
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }
    //join group
}
module.exports = GroupsList