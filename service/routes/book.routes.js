module.exports = app => {
    const books = require("../controllers/book.controller.js");
    const authors = require("../controllers/book.controller.js");
        var router = require("express").Router();
    // Create a new Book
    router.post("/add/:userId", books.create);
    // Retrieve all shelves
    router.get("/", books.findAll);
    // Retrieve a single Shelf with id
    router.get("/:id", books.findOne);
    // Update a Shelf with id
    router.put("/:id", books.update);
    // Delete a Shelf with id
    router.delete("/:id", books.delete);
    app.use('/results', router);
    };
