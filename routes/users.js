'use strict';
const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs');

const usersList = require('../models/usersModel');
/* GET users listing. */
router.get('/', (req, res) => {
    res.redirect('/users/login');
});
// how do we store session details?
// router.get('/logout', (req, res) => {
//     req.session.destroy();
//     res.redirect('/');
// });
/* GET users listing. */
router.post('/login', async (req, res) => {
    const {
        name,
        password
    } = req.body;
    const userInstance = new usersList(null, name, email, password);
    userInstance.login().then(response => {
        console.log(response);
        req.session.is_logged_in = response.isValid;
        if (!!response.isValid) {
            const {
                email,
                name,
                user_id
            } = response;
            req.session.email = email
            req.session.user_id = user_id
            req.session.name = name
            res.redirect('/')
        } else {
            res.sendStatus(401)
        }
    })
})
router.post('/signup', (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userInstance = new usersList(null, name, email, hash);

    userInstance.save().then(response => {
        if (response.id !== undefined) {
            res.redirect('/users/login');
        } else {
            res.redirect('/users/signup');
        }
    });
});
module.exports = router;

