require('date-utils');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const signInCheck = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/signin');
    }
};

//記事の管理ページトップ
router.get('/', signInCheck, (req, res) => {
    res.render('admin/manageTopics');
});

//記事の新規作成ページ
router.get('/writenewtopics', signInCheck, (req, res) => {
    res.render('admin/writeNewTopics');
});

router.post('/writenewtopics', signInCheck, (req, res) => {
    const now = new Date();
    const time = now.toFormat('YYYY_MM_DD_HH24_MI_SS');
    const savePath = 'public/images/topics/' + time;
    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
    }
    let count = 0;
    console.log(req.files);
    req.files.imgfiles.forEach((image) => {
        console.log(image);
        const imgExt = path.extname(image.name);
        const newImgName = '/img' + String(count) + imgExt;
        fs.writeFile(savePath + newImgName, image.data, (err) => {
            if (err) {
                console.log(err);
                req.session.error = true;
                res.redirect('/admin/error');
            }
        });
        count++;
    });
    res.redirect('/admin/managetopics');
});

module.exports = router;