const db = require("../models");
const Comment = db.comments;
const Group = db.groups;
const User = db.users;
const userGroup = db.user_group
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    
    Group.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving groups."
            });
        });
    };
exports.findAllUser = async (req, res) => {
    const { userId } = req.params;
    const userInstance = await User.findOne({where: { id: userId}})
    // console.log('user instance is the following data: ', userInstance)
    // var condition = userId ? { id: { [Op.eq]: `${userId}` } } : null;
    Group.findAll({ include: [{model: User, where: { id: userId}}]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users groups."
            });
        });
    };
exports.create = async (req, res) => {
    //Validate request
    console.log('this is what is getting sent in as the req.body: ', req.body)
    if (!req.body.groupName) {
        res.status(400).send({
            message: "Name cannot be empty!"
        });
        return;
    }
    
    //create a new group
    const group = {
        groupName: req.body.groupName,
        groupDescription: req.body.groupDescription};
    //save book in DB
    const groupAdded = await Group.create(group)
    console.log("group info is: ", groupAdded)
    const { userId } = req.params;
    const user = await User.findOne({where: { id: userId}})
    console.log("user info is: ", user)
    await user.addGroup(groupAdded, { through: {isAdmin: true} })
        .then (data=> {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the book."
            });
        });
    
    };
exports.joinOne = async (req, res) => {
    const { userId } = req.params;
    const { groupId } = req.body;
    const groupJoined = await Group.findByPk(groupId)
    const user = await User.findOne({where: {id: userId}})
    console.log("user info is: ", user)
    await user.addGroup(groupJoined, { through: {isAdmin: false} })
        .then (data=> {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while joining the group."
            });
        });
    };
exports.leaveOne = async (req, res) => {
    const { userId } = req.params;
    const { groupId } = req.body;
    const groupLeft = await Group.findByPk(groupId)
    console.log("group to leave", groupLeft);
    const user = await User.findOne({where: {id: userId}})
    console.log("user info is: ", user)
    await user.addGroup(groupLeft, { through: {isAdmin: false} })
        .then (data=> {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while leaving the group."
            });
        });
    };
exports.findOne = (req, res) => {
    const { groupId } = req.params;
    Group.findOne({ where: { id: groupId }, include: [{model: User}]})
        .then(data => {
            res.send(data);
            })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Shelf with id=" + groupId
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
exports.deleteUserfromGroup = (req, res) => {
    const {id, userid} = req.params;
    console.log(req.params)
    userGroup.destroy({
        where: { GroupId: id, UserId: userid}
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "User in group was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete usergroup with id=${id}. Maybe usergroup was not found!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete usergroup with id=" + id
        });
        });
    };

// Controllers for comments
exports.createComment = async (req, res) => {
    //Validate request
    console.log('this is what is getting sent in as the req.body: ', req.body)
    if (!req.body.content) {
        res.status(400).send({
            message: "Comment content cannot be empty!"
        });
        return;
    }
    const { groupId } = req.params;
    const { content, Users } = req.body;
    console.log("Users", Users[0])
    const comment = await Comment.create({
        content: content 
    })
    const user = await User.findOne({where: { id: Users[0].id }})
    await user.addComment(comment)
    const group = await Group.findOne({where: { id: groupId }})
    await group.addComment(comment)
        .then (data=> {
            res.send(data).status(200);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the book."
            });
        });
    
    };
exports.findAllComments = async (req, res) => {
    const { groupId } = req.params;
    console.log(Comment.findAll({ where: { GroupId: groupId }, include: [{model: User}]}))
    Comment.findAll({ where: { GroupId: groupId }, include: [{model: User}]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving groups."
            });
        });
    };