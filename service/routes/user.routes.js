module.exports = app => {
    const users = require("../controllers/user.controller.js");
        var router = require("express").Router();
    // Create a new group
    router.post("/add", users.create);
    // Retrieve all users
    router.get("/", users.findAll);
    // Retrieve all users with user id
    router.get("/:userId", users.findAllUser);
    // Retrieve a single group with id
    router.get("/:id", users.findOne);
    // Update a group with id
    router.put("/:id", users.update);
    // Delete a group with id
    router.delete("/:id", users.delete);
    app.use('/users', router);
    };
