module.exports = app => {
    const shelves = require("../controllers/shelf.controller.js");
        var router = require("express").Router();
    // Create a new Shelf
    router.post("/add/:userId", shelves.create);
    // Retrieve all shelves
    router.get("/:userId", shelves.findAllUser);
    // Retrieve a single Shelf with id
    router.get("/:id", shelves.findOne);
    // Update a Shelf with id
    router.put("/:id", shelves.update);
    // Delete a Shelf with id
    router.delete("/:id", shelves.delete);
    app.use('/library', router);
    };
