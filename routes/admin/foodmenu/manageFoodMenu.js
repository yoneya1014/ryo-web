require('date-utils');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const foodMenuModel = require('../../../models/foodMenuModel');
const foodMenu = foodMenuModel.foodMenu;

const signInCheck = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/signin');
    }
};

//献立表の管理ページトップ
router.get('/', signInCheck, (req, res) => {
    res.render('admin/foodmenu/manageFoodMenu');
});


module.exports = router;