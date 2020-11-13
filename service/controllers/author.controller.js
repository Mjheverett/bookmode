const db = require("../models");
const Author = db.authors;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const AuthorName = req.body.AuthorName;
    var condition = AuthorName ? { title: { [Op.like]: `%${AuthorName}%` } } : null;
    Author.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving authors."
            });
        });
    };

exports.create = (req, res) => {
    //Validate request
    console.log('this is what is getting sent in as the req.body: ', req.body)
    if (!req.body.AuthorName) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }
    //create a new Author
    const Author = {
        AuthorName: req.body.AuthorName,
        AuthorDescription: req.body.AuthorDescription};
    //save Author in DB
    Author.create(Author)
        .then (data=> {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Author."
            });
        });
    };
    
exports.findOne = (req, res) => {
    const id = req.params.id;
    Author.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving Author with id=" + id
        });
        });
    };

exports.update = (req, res) => {
    const id = req.params.id;
    Author.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Author was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Author with id=${id}. Maybe the Author was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Author with id=" + id
        });
        });
    };
    
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Author.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Author was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Author with id=${id}. Maybe Author was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Author with id=" + id
        });
        });
    };