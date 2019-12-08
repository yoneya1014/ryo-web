const express = require('express');
const router = express.Router();

const signInCheck = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/signin');
    }
};

router.get('/', signInCheck, (req, res) => {
    res.render('admin/index', {
        user: req.session.user
    });
});

module.exports = router;