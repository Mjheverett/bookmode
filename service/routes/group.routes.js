module.exports = app => {
    const groups = require("../controllers/group.controller.js");
        var router = require("express").Router();
    // Create a new Book
    router.post("/add", groups.create);
    // Retrieve all shelves
    router.get("/", groups.findAll);
    // Retrieve a single Shelf with user id
    router.get("/:userId", groups.findOne);
    // Retrieve a single Shelf with id
    router.get("/:id", groups.findOne);
    // Update a Shelf with id
    router.put("/:id", groups.update);
    // Delete a Shelf with id
    router.delete("/:id", groups.delete);
    app.use('/results', router);
    };
