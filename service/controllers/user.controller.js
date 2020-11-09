const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    //Validate request
    console.log('this is what is getting sent in as the req.body: ', req.body)
    
    //create a new book
    const user = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email};
    //save book in DB
    await User.findOrCreate({
        where: { id: user.id },
        defaults: {
            name: user.name,
            email: user.email
        }
    })
        .spread((user, created) => {
            console.log(user.get({
                plain: true
            }))
            console.log(created)
        })
        
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
    
    };
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all users."
            });
        });
    };
exports.findOne = (req, res) => {
    const { userId } = req.params;
    User.findByPk(userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Error retrieving user with id=" + userId
            });
        });
    };
exports.update = (req, res) => {
    const { userId } = req.params;
    User.update(req.body, {
        where: { id: userId }
    })
        .then(num => {
        if (num == 1) {
            res.send({
                message: "User was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update User with id=${userId}. Maybe the User was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + userId
            });
        });
    };
exports.delete = (req, res) => {
    const { userId } = req.params;
    
    User.destroy({
        where: { id: userId }
    })
        .then(num => {
        if (num == 1) {
            res.send({
                message: "User was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete User with id=${userId}. Maybe User was not found!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + userId
            });
        });
    };