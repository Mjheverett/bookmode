const db = require("../models");
const Shelf = db.shelves;
const Book = db.books;
const Author = db.authors;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
    const shelfName = req.body.shelfName;
    var condition = shelfName ? { title: { [Op.like]: `%${shelfName}%` } } : null;
    await Shelf.findAll({ where: condition,
        include: [{model: Book, include: [{model: Author}]}]})
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
    if (!req.body.shelfName) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }
    //create a new shelf
    const shelf = {
        shelfName: req.body.shelfName,
        shelfDescription: req.body.shelfDescription};
    //save shelf in DB
    Shelf.create(shelf)
        .then (data=> {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the shelf."
            });
        });
    };
exports.findOne = (req, res) => {
    const id = req.params.id;
    Shelf.findByPk(id)
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
    Shelf.update(req.body, {
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
    
    Shelf.destroy({
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