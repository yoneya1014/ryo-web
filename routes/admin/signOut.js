const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy();
    console.log('signout succeed');
    res.redirect('/');
});

module.exports = router;