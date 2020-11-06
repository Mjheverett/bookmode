const db = require("../models");
const Book = db.books;
const Author = db.authors;
const Authors_Books = db.authors_books;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const {title, imageURL } = req.body;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Book.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving books."
            });
        });
    };
exports.create = (req, res) => {
    //Validate request
    console.log('this is what is getting sent in as the req.body: ', req.body)
    //create a new book if not already there
    const {title, coverURL, authorName } = req.body;
    //save book in DB
    Book.create({
        title: title,
        coverURL: coverURL,
        authors: [
            { authorName: authorName},
        ]
        }, {
        include: [ Author ]
        })
    .then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the book."
            });
        })
    // //save book and author association in authors_books
    // const authorInstance = Author.findOne({ where: { author } });
    // const bookInstance = Book.findOne({ where: { book } });
    // const duo = {
    //     AuthorId: authorInstance.id,
    //     BookId: bookInstance.id
    // }
    // Authors_Books.create(duo)
    //     .then (data=> {
    //         res.send(data).status(200);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the association of book and author."
    //         });
    //     });
    };
exports.findOne = (req, res) => {
    const id = req.params.id;
    Book.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving Book with id=" + id
        });
        });
    };
exports.update = (req, res) => {
    const id = req.params.id;
    Book.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Book was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Bookwith id=${id}. Maybe the Book was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Book with id=" + id
        });
        });
    };
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Book.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Book was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete book with id=" + id
        });
        });
    };