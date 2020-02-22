const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const csrf = require('csurf');
const numberOfResidentsModel = require('../../../models/numberOfResidentsModel');
const numberOfResidents = numberOfResidentsModel.numberOfResidents;

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

router.get('/', csrfProtection, signInCheck, (req, res) => {
    res.render('admin/managecontent/numberofresidents/editNumbers', {
        _csrf: req.csrfToken()
    });
});

module.exports = router;