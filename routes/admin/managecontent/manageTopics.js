require('date-utils');
const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const topicsModel = require('../../../models/topicsModel');
const topics = topicsModel.topics;

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

//投稿の管理ページトップ
router.get('/', signInCheck, (req, res) => {
    res.render('admin/managecontent/topics/manageTopics');
});

//投稿の新規作成ページ
router.get('/writenew', csrfProtection, signInCheck, (req, res) => {
    res.render('admin/managecontent/topics/writeNewTopics', {
        _csrf: req.csrfToken()
    });
});

router.post('/writenew', parseForm, csrfProtection, signInCheck, (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const content = req.body.content;
    let imageUrl = '';
    let now = new Date();
    const time = now.toFormat('YYYY_MM_DD_HH24_MI_SS');
    now.setTime(now.getTime() + 1000 * 60 * 60 * 9);
    if (req.files !== null) {
        const savePath = 'public/images/topics/' + time + '/';
        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }
        let count = 0;
        if (req.files.imgfiles.length === undefined) {
            const imgExt = path.extname(req.files.imgfiles.name);
            const newImgName = 'img0' + imgExt;
            fs.writeFile(savePath + newImgName, req.files.imgfiles.data, (err) => {
                if (err) {
                    console.log(err);
                    req.session.error = true;
                    res.redirect('/admin/error');
                }
            });
        } else {
            req.files.imgfiles.forEach((image) => {
                const imgExt = path.extname(image.name);
                const newImgName = 'img' + String(count) + imgExt;
                fs.writeFile(savePath + newImgName, image.data, (err) => {
                    if (err) {
                        fs.rmdirSync(savePath);
                        console.log(err);
                        req.session.error = true;
                        res.redirect('/admin/error');
                    }
                });
                count++;
            });
        }
        imageUrl = savePath.substr(7);
    }
    const topicsData = new topics({
        title: title,
        description: description,
        content: content,
        image_url: imageUrl,
        date: now
    });
    topicsData.save((err) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        res.redirect('/admin/managecontent/topics');
    });
});

//過去の投稿一覧表示用ページ
router.get('/list/:year', signInCheck, (req, res) => {
    topics.find({
        date: {
            $gte: new Date(req.params.year + '-01-01T00:00:00+09:00'),
            $lt: new Date(req.params.year + '-12-31T23:59:59+09:00')
        }
    }, (err, data) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        let dates = [];
        let objId = [];
        let count = 0;
        data.forEach((value) => {
            let date = new Date(value.date);
            date.setTime(date.getTime() - 1000 * 60 * 60 * 9);
            dates[count] = date;
            objId[count] = value._id;
            count++;
        });
        res.render('admin/managecontent/topics/listTopics', {
            dates: dates,
            objid: objId
        });
    });
});

//過去の投稿の削除用処理
router.get('/list/delete/:id', signInCheck, (req, res) => {
    const objId = req.params.id;
    topics.findOne({
        _id: objId
    }, (err, data) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        if (data.image_url !== '') {
            if (fs.existsSync('public/' + data.image_url)) {
                const imgFiles = fs.readdirSync('public/' + data.image_url);
                imgFiles.forEach((file) => {
                    fs.unlinkSync('public/' + data.image_url + file);
                });
                fs.rmdirSync('public/' + data.image_url);
            }
        }
        data.remove();
        res.redirect('/admin/managecontent/topics/list/' + new Date().toFormat('YYYY'));
    });
});

module.exports = router;