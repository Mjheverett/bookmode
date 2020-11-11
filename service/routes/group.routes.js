module.exports = app => {
    const groups = require("../controllers/group.controller.js");
        var router = require("express").Router();
    // Create a new group
    router.post("/add/:userId", groups.create);
    // Join a group
    router.post("/join/:userId", groups.joinOne);
    // Retrieve all groups with user id
    router.get("/:userId", groups.findAllUser);
    // Retrieve all groups
    router.get("/", groups.findAll);
    // Retrieve a single group with id
    router.get("/group/:groupId", groups.findOne);
    // Update a group with id
    router.put("/group/update/:id", groups.update);
    // Delete a group with id
    router.delete("/:id", groups.delete);
    // Add comment to Group page
    router.post("/comments/:groupId", groups.createComment);
    // Get all comments for a group
    router.get("/comments/:groupId", groups.findAllComments);
    app.use('/groups', router);
    };
