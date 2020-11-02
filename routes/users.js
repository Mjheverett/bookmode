'use strict';
const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs');

const usersList = require('../models/usersModel');
/* POST new user */
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
