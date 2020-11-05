module.exports = (app, db) => {
    // GET users library
    app.get('/library', async (req, res) => 
        await db.Library.findAll({
            where: {
                userID: req.params.id
            }
        }).then( (result) => res.json(result))
    );

    // POST new book to books and add to library by userID
    app.post('/library/add', async (req, res) => {
        const { authorName, bookTitle } = req.body
        await db.Author.findOrCreate({ where: {authorName: authorName}, defaults: { authorName: authorName}});
        await db.Book.findOrCreate({ where: {title: bookTitle}, defaults: { title: bookTitle, authorID: author.id}});
        await db.Shelf.findOrCreate({ where: {books: book.id}, defaults: { title: bookTitle, authorID: author.id}});
        console.log("Book's title", book.title);
        await res.JSON({shelf, book, author}).status(200)
    })
}