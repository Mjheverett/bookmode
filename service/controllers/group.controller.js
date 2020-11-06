const db = require("../models");
const Group = db.groups;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const {title, author, imageURL } = req.body;
    var condition = shelfName ? { title: { [Op.like]: `%${shelfName}%` } } : null;
    Group.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving shelves."
            });
        });
    };
exports.create = (req, res) => {
    //Validate request
    console.log('this is what is getting sent in as the req.body: ', req.body)
    if (!req.body.title) {
        res.status(400).send({
            message: "Title cannot be empty!"
        });
        return;
    }
    //create a new author if not already there
    const author = {
        authorName: req.body.author
    }
    Author.findOrCreate({
        where: { author }});
    //create a new book
    const book = {
        title: req.body.title,
        coverURL: req.body.imageURL};
    //save book in DB
    Group.create(book)
        .then (data=> {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the book."
            });
        });
    //save book and author association in authors_books
    const authorInstance = await Author.findOne({ where: { author } });
    const bookInstance = await Book.findOne({ where: { book } });
    const duo = {
        AuthorId: authorInstance.id,
        BookId: bookInstance.id
    }
    Authors_Books.create(duo)
        .then (data=> {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the association of book and author."
            });
        });
    };
exports.findOne = (req, res) => {
    const id = req.params.id;
    Group.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving Shelf with id=" + id
        });
        });
    };
exports.update = (req, res) => {
    const id = req.params.id;
    Group.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Shelf was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Shelf with id=${id}. Maybe the Shelf was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Shelf with id=" + id
        });
        });
    };
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Group.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Shelf was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Shelf with id=${id}. Maybe Shelf was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Shelf with id=" + id
        });
        });
    };