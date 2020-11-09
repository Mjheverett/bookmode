module.exports = app => {
    const users = require("../controllers/user.controller.js");
        var router = require("express").Router();
    // Create a new group
    router.post("/add", users.create);
    // Retrieve all users
    router.get("/", users.findAll);
    // Retrieve a single group with id
    router.get("/:userId", users.findOne);
    // Update a group with id
    router.put("/:userId", users.update);
    // Delete a group with id
    router.delete("/:userId", users.delete);
    app.use('/users', router);
    };
