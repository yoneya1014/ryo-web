const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const userModel = require('../../../models/userModel');
const user = userModel.user;

router.get('/', (req, res) => {
    user.find((err, data) => {
        console.log(data.length);
        if (data.length === 0) {
            res.render('admin/manageuserinfo/init');
        } else {
            res.redirect('/admin/signin');
        }
    });
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const userData = new user({
        username: username,
        password: hash
    });
    userData.save((err) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.redirect('/admin/signin');
        }
    });
});

module.exports = router;