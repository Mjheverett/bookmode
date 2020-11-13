module.exports = app => {
    const groups = require("../controllers/group.controller.js");
        var router = require("express").Router();
    // Create a new group
    router.post("/add/:userId", groups.create);
    // Join a group
    router.post("/join/:userId", groups.joinOne);
    // Leave a group
    router.post("/leave/:userId", groups.leaveOne);
    // Retrieve all groups with user id
    router.get("/:userId", groups.findAllUser);
    // Retrieve all groups
    router.get("/", groups.findAll);
    // Retrieve a single group with id
    router.get("/group/:groupId", groups.findOne);
    // Update a group with id
    router.put("/group/update/:id", groups.update);
    // Delete a group with id
    router.delete("/delete/:id", groups.delete);
    // Add comment to Group page
    router.post("/comments/add/:groupId", groups.createComment);
    // Get all comments for a group
    router.get("/comments/:groupId", groups.findAllComments);
    //Delete user in a specific group (aka leave a group)
    router.delete("/:id/:userid", groups.deleteUserfromGroup);
    app.use('/groups', router);
    };
