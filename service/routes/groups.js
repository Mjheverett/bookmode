module.exports = (app, db) => {

    // GET all groups
    app.get('/all', async (req, res) => {
        const groupData = await groupsList.getAllGroups();

        res.json(groupData).status(200);
    })

    // GET users groups
    app.get('/:user_id?', async (req, res) => {
        const groupData = await groupsList.getUserGroups(req.params.user_id);

        res.json(groupData).status(200);
    })

    // GET group details
    app.get('/:group_id?', async (req, res) => {
        const groupData = await groupsList.getGroupDetails(req.params.group_id);

        res.json(groupData).status(200);
    })

    // POST create new group
    app.post('/add', async (req, res) => {
        const response = await groupsList.createGroup(req.body, req.params.user_id)
        console.log("add group response is:", response)
        await res.redirect('/groups')
    })
}