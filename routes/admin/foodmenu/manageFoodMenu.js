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

//過去の献立一覧表示用ページ
router.get('/listfoodmenu/:year', signInCheck, (req, res) => {
    foodMenu.find({
        from: {
            $gte: new Date(req.params.year + '-01-01T00:00:00+09:00'),
            $lt: new Date(req.params.year + '-12-31T23:59:59+09:00')
        }
    }, (err, data) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        let fromDates = [];
        let toDates = [];
        let objId = [];
        let count = 0;
        data.forEach((value) => {
            let fromDate = new Date(value.from);
            fromDate.setTime(fromDate.getTime() - 1000 * 60 * 60 * 9);
            let toDate = new Date(value.to);
            toDate.setTime(toDate.getTime() - 1000 * 60 * 60 * 9);
            fromDates[count] = fromDate;
            toDates[count] = toDate;
            objId[count] = value._id;
            count++;
        });
        res.render('admin/foodmenu/listFoodMenu', {
            from_dates: fromDates,
            to_dates: toDates,
            objid: objId
        });
    });
});

router.get('/listfoodmenu/delete/:id', signInCheck, (req, res) => {
    const objId = req.params.id;
    foodMenu.findOne({
        _id: objId
    }, (err, data) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        const from = new Date(data.from);
        const filePath = 'public/other_objects/foodmenu/' + from.toFormat('YYYY_MM_DD') + '.pdf';
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        data.remove();
        res.redirect('/admin/managefoodmenu/listfoodmenu/' + new Date().toFormat('YYYY'));
    });
});

module.exports = router;