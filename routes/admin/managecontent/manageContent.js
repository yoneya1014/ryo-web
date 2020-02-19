require('date-utils');
const express = require('express');
const router = express.Router();

//サインイン済みかをチェック
const signInCheck = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/signin');
    }
};

router.get('/', signInCheck, (req, res) => {
    res.render('admin/managecontent/manageContent');
});

module.exports = router;