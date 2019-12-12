const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const model = require('../../../models/userModel');
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
            res.render('admin/manageuserinfo/signIn', {
                message: ''
            });
        }
    });
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    user.find((err, data) => {
        if (err) {
            console.log(err);
            res.render('admin/manageuserinfo/signIn', {
                message: '予期せぬエラーが発生しました'
            });
        }
        if (data.length === 0) {
            res.redirect('/admin/init');
        } else if (data[0].username === username) {
            if (bcrypt.compareSync(password, data[0].password)) {
                req.session.user = username;
                res.redirect('/admin');
            } else {
                res.render('admin/manageuserinfo/signIn', {
                    message: 'ユーザー名、またはパスワードが正しくありません'
                });
            }
        } else {
            res.render('admin/manageuserinfo/signIn', {
                message: 'ユーザー名、またはパスワードが正しくありません'
            });
        }
    });
});

module.exports = router;