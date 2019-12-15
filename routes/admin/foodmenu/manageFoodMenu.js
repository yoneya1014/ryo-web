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

//献立表のアップロードページ
router.get('/uploadnewmenu', signInCheck, (req, res) => {
    res.render('admin/foodmenu/uploadNewMenu');
});

router.post('/uploadnewmenu', signInCheck, (req, res) => {
    const from = new Date(req.body.from);
    const to = new Date(req.body.to);
    const menuFile = req.files.menufile;
    const savePath = 'public/other_objects/foodmenu/';
    const fileName = from.toFormat('YYYY_MM_DD');
    const fileExt = '.pdf';
    fs.writeFile(savePath + fileName + fileExt, menuFile.data, (err) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
    });
    const foodMenuData = new foodMenu({
        filename: fileName + fileExt,
        from: from,
        to: to,
    });
    foodMenuData.save((err) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        res.redirect('/admin/managefoodmenu');
    });
});

module.exports = router;