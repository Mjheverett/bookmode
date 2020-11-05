module.exports = (app, db) => {

    /* POST new user */
    router.post('/signup', (req, res) => {
        const {
            name,
            email,
        } = req.body;

        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(password, salt);

        const userInstance = new usersList(null, name, email);

        userInstance.save().then(response => {
            if (response.id !== undefined) {
                res.redirect('/users/login');
            } else {
                res.redirect('/users/signup');
            }
        });
    });
}
