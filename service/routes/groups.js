module.exports = (app, db) => {

    // GET all groups
    router.get('/all', async (req, res) => {
        const groupData = await groupsList.getAllGroups();

        res.json(groupData).status(200);
    })

    // GET users groups
    router.get('/:user_id?', async (req, res) => {
        const groupData = await groupsList.getUserGroups(req.params.user_id);

        res.json(groupData).status(200);
    })

    // GET group details
    router.get('/:group_id?', async (req, res) => {
        const groupData = await groupsList.getGroupDetails(req.params.group_id);

        res.json(groupData).status(200);
    })

    // POST create new group
    router.post('/add', async (req, res) => {
        const response = await groupsList.createGroup(req.body, req.params.user_id)
        console.log("add group response is:", response)
        await res.redirect('/groups')
    })
}

// POST join group



// const { response } = require("express");
// const db = require("./conn");

// class GroupsList {
//     constructor(id, name, user_id) {
//         this.id = id;
//         this.name = name;
//         this.user_id = user_id;
//     }
    
//     //get all groups
//     static async getAllGroups() {
//         try {
//             const response = await db.any(`SELECT * FROM groups;`);
//             return response;
//         } catch (error) {
//             console.error('ERROR:', error.message);
//             return error.message;
//         }
//     }
//     //get users groups
//     static async getUserGroups(user_id) {
//         user_id = 2;
//         try {
//             const response = await db.any(`SELECT * FROM groups WHERE user_id = $1;`, [user_id]);
//             return response;
//         } catch (error) {
//             console.error('ERROR:', error.message);
//             return error.message;
//         }
//     }
//     //get group details
//     static async getGroupDetails(group_id) {
//         try {
//             const response = await db.one(`SELECT * FROM groups WHERE id = $1;`, [group_id]);
//             return response;
//         } catch (error) {
//             console.error('ERROR:', error.message);
//             return error.message;
//         }
//     }
//     //create new group
//     static async createGroup(data, user_id) {
//         try {
//             const response = await db.result(`INSERT INTO groups (name, user_id) VALUES($1, $2);`, [data.name, user_id]);
//             return response;
//         } catch (error) {
//             console.error('ERROR:', error.message);
//             return error.message;
//         }
//     }
//     //join group
// }
// module.exports = GroupsList