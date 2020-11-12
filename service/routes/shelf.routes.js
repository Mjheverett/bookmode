module.exports = app => {
    const shelves = require("../controllers/shelf.controller.js");
        var router = require("express").Router();
    // Create a new Shelf
    router.post("/add/:userId", shelves.create);
    // Retrieve all shelves
    router.get("/:userId", shelves.findAllUser);
    // Add a single book to a shelf
    router.post("/:shelfId/:bookId", shelves.findOne);
    // Update a Shelf with id
    router.put("/:id", shelves.update);
    // Delete a Shelf with id
    router.delete("/:id", shelves.delete);
    // Delete a book from shelf
    router.delete("/book/:id", shelves.deleteBook);
    app.use('/library', router);
    };
