const express = require('express');
const router = express.Router();
const topicsModel = require('../models/topicsModel');
const topics = topicsModel.topics;

router.get('/', function (req, res) {
    topics.find({}).sort('-date').limit(3).exec((err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.render('index', {
                data: data
            });
        }
    });
});

module.exports = router;
