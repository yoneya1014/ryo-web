const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const bcrypt = require('bcrypt');
const router = express.Router();
const model = require('../../../models/userModel');
const user = model.user;
let message = '';

//CSRF対策
const csrfProtection = csrf({cookie: true});
const parseForm = bodyParser.urlencoded({extended: false});

router.get('/', csrfProtection, (req, res) => {
    user.find((err, data) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        if (data.length === 0) {
            res.redirect('/admin/init');
        } else {
            res.render('admin/manageuserinfo/signIn', {
                message: message,
                _csrf: req.csrfToken()
            });
        }
    });
});

router.post('/', parseForm, csrfProtection, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    user.find((err, data) => {
        if (err) {
            console.log(err);
            message = '予期せぬエラーが発生しました';
            res.redirect('/admin/signin');
        }
        if (data.length === 0) {
            res.redirect('/admin/init');
        } else if (data[0].username === username) {
            if (bcrypt.compareSync(password, data[0].password)) {
                req.session.user = username;
                req.session.save((err) => {
                    if (err) {
                        req.session.destroy();
                        console.log(err);
                        message = '予期せぬエラーが発生しました';
                        res.redirect('/admin/signin');
                    }
                    res.redirect('/admin');
                });

            } else {
                message = 'ユーザー名、またはパスワードが正しくありません';
                res.redirect('/admin/signin');
            }
        } else {
            message = 'ユーザー名、またはパスワードが正しくありません';
            res.redirect('/admin/signin');
        }
    });
});

module.exports = router;