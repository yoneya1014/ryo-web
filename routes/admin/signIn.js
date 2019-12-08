const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const model = require('../../models/userModel');
const user = model.user;

router.get('/', (req, res) => {
    user.find((err, data) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        if (data.length === 0) {
            res.redirect('/admin/init');
        } else {
            res.render('admin/signIn');
        }
    });
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    user.find((err, data) => {
        if (err) {
            console.log(err);
            res.render('admin/signIn');
        }
        if (data.length === 0) {
            res.redirect('/admin/init');
        } else if (data[0].username === username) {
            if (bcrypt.compareSync(password, data[0].password)) {
                req.session.user = username;
                res.redirect('/admin');
            } else {
                res.redirect('/admin/signin');
            }
        } else {
            res.redirect('/admin/signin');
        }
    });
});

module.exports = router;