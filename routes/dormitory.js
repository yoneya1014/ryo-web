const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/secretary', function (req, res, next) {
    res.render('dormitory/secretary');
});

module.exports = router;
