const db = require("../models");
const Book = db.books;
const Author = db.authors;
const Shelf = db.shelves;
const User = db.users;
const Recommendation = db.recommendations

exports.create = async (req, res) => {
    console.log('this is what is getting sent in as the req.body: ', req.body)
    const { content, receiverName, senderId, bookId} = req.body;
    const receiver = await User.findOne({where: { name: receiverName}})
    await Recommendation.create({
        comment: content,
        senderId: senderId,
        receiverId: receiver.id,
        BookId: bookId,
    })
        .then(data => {
            res.send(data);
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the recommendation."
                });
            })
        };

exports.findAllSent = async (req, res) => {
    console.log('this is what is getting sent in as the req.body: ', req.params)
    const { userId } = req.params;
    console.log(Recommendation.findAll({ where: { senderId: userId }, include: 'receiver'}))
    await Recommendation.findAll({ where: { senderId: userId }, include: [{model: Book}, 'receiver']})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving recommendations"
            });
        });
    };
    
exports.findAllReceived = async (req, res) => {
    const { userId } = req.params;
    await Recommendation.findAll({ where: { receiverId: userId }, include: [{model: Book}, 'sender']})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving recommendations"
            });
        });
    };
