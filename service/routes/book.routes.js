module.exports = app => {
    const books = require("../controllers/book.controller.js");
        var router = require("express").Router();
    // Create a new Book
    router.post("/add/:userId", books.create);
    // Retrieve all books
    router.get("/:key?", books.findAll);
    // Retrieve a single book with id
    router.get("/:id", books.findOne);
    // Update a book with id
    router.put("/:id", books.update);
    // Delete a book with id
    router.delete("/:id", books.delete);
    app.use('/results', router);
    };
