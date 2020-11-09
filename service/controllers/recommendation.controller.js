// const db = require("../models");
// const Book = db.books;
// const Author = db.authors;
// const Shelf = db.shelves;
// const User = db.users;
// const Recommendation = db.recommendations


// exports.create = async (req, res) => {
//     const { id }= req.params
//     const book = await Book.findByPk(id)
//     const { userId } = req.params;
//     const sender = await User.findOne({where: { id: userId}})
//     console.log('this is what is getting sent in as the req.body: ', req.body)
//     const { comment, receiverId } = req.body;
//     const receiver = const user = await User.findOne({where: { name: receiverId}})
//         const book = await Book.create({
//             title: title,
//             coverURL: coverURL,})
//     await author.addBook(book)
//     const shelf= await Shelf.findByPk(1)
//         await shelf.addBook(book)
//         .then(data => {
//             res.send(data);
//         })
//             .catch(err => {
//                 res.status(500).send({
//                     message:
//                         err.message || "Some error occurred while creating the book."
//                 });
//             })
//         }
//     await user.addRecommendation(book)

// }