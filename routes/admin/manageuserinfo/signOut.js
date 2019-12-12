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
    req.session.destroy();
    console.log('signout succeed');
    res.redirect('/admin/signin');
});

module.exports = router;