const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const bcrypt = require('bcrypt');
const router = express.Router();
const userModel = require('../../../models/userModel');
const user = userModel.user;

//サインイン済みかをチェック
const signInCheck = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/signin');
    }
};

//CSRF対策
const csrfProtection = csrf({cookie: true});
const parseForm = bodyParser.urlencoded({extended: false});

//管理ユーザーの情報変更項目の選択ページ
router.get('/', signInCheck, (req, res) => {
    res.render('admin/manageuserinfo/changeAdminDataMenu', {
        user: req.session.user
    });
});

//管理ユーザー名変更用の処理
router.get('/username', csrfProtection, signInCheck, (req, res) => {
    res.render('admin/manageuserinfo/changeUserProps', {
        user: req.session.user,
        target: 'ユーザー名',
        url_path: '/username',
        message: '',
        _csrf: req.csrfToken()
    });
});

router.post('/username', parseForm, csrfProtection, signInCheck, (req, res) => {
    const oldName = req.body.old_object;
    const newName = req.body.new_object;
    user.find((err, data) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        if (data[0].username === oldName) {
            user.update({
                username: oldName
            }, {
                $set: {username: newName}
            }, (err) => {
                if (err) {
                    console.log(err);
                    req.session.error = true;
                    res.redirect('/admin/error');
                } else {
                    res.redirect('/admin/changeadmindata');
                }
            });
        } else {
            res.render('admin/manageuserinfo/changeUserProps', {
                user: req.session.user,
                target: 'ユーザー名',
                url_path: '/username',
                message: '古いユーザー名が正しくありません'
            });
        }
    });
});

//管理ユーザーのパスワード変更用の処理
router.get('/password', csrfProtection, signInCheck, (req, res) => {
    res.render('admin/manageuserinfo/changeUserProps', {
        user: req.session.user,
        target: 'パスワード',
        url_path: '/password',
        message: '',
        _csrf: req.csrfToken()
    });
});

router.post('/password', parseForm, csrfProtection, signInCheck, (req, res) => {
    const oldPassword = req.body.old_object;
    const newPassword = req.body.new_object;
    user.find((err, data) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        if (bcrypt.compareSync(oldPassword, data[0].password)) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPassword, salt);
            user.update({
                username: req.session.user
            }, {
                $set: {password: hash}
            }, (err) => {
                if (err) {
                    console.log(err);
                    req.session.error = true;
                    res.redirect('/admin/error');
                } else {
                    res.redirect('/admin/changeadmindata');
                }
            });
        } else {
            res.render('admin/manageuserinfo/changeUserProps', {
                user: req.session.user,
                target: 'パスワード',
                url_path: '/password',
                message: '古いパスワードが正しくありません'
            });
        }
    });
});

module.exports = router;