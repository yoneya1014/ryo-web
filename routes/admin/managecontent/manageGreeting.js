const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const csrf = require('csurf');
const path = require('path');
const fs = require('fs');
const greetingsModel = require('../../../models/greetingsModel');
const greetings = greetingsModel.greetings;

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

router.get('/', signInCheck, (req, res) => {
    res.render('admin/managecontent/greeting/manageGreeting');
});

//寮務主事挨拶の編集ページ用ルーティング
router.get('/secretary', csrfProtection, signInCheck, (req, res) => {
    greetings.findOne({
        person_type: "secretary"
    }, (err, data) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        if (data == null) {
            res.render('admin/managecontent/greeting/editGreeting', {
                _csrf: req.csrfToken(),
                person_type: 'secretary',
                greeting_text: '',
                image_ext: ''
            });
        } else {
            res.render('admin/managecontent/greeting/editGreeting', {
                _csrf: req.csrfToken(),
                person_type: data.person_type,
                greeting_text: data.greeting_text,
                image_ext: data.image_ext
            });
        }
    });
});

router.post('/secretary', parseForm, csrfProtection, signInCheck, (req, res) => {
    const greetingText = req.body.greeting_text;
    let imgExt = '';
    if (req.files !== null) {
        const savePath = "public/images/greetings/";
        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }
        imgExt = path.extname(req.files.imgfiles.name);
        const newImgName = 'secretary' + imgExt;
        fs.writeFile(savePath + newImgName, req.files.imgfiles.data, (err) => {
            if (err) {
                console.log(err);
                req.session.error = true;
                res.redirect('/admin/error');
            }
        })
    }
    if (req.body.updateflag === 'false') {
        const model = new greetings({
            person_type: 'secretary',
            greeting_text: greetingText,
            image_ext: imgExt
        });
        model.save((err) => {
            if (err) {
                console.log(err);
                req.session.error = true;
                res.redirect('/admin/error');
            }
            res.redirect('/admin/managecontent/greeting');
        });
    } else if (req.body.updateflag === 'true') {
        greetings.update({
            person_type: 'secretary'
        }, {
            person_type: 'secretary',
            greeting_text: greetingText,
            image_ext: imgExt
        }, (err) => {
            if (err) {
                console.log(err);
                req.session.error = true;
                res.redirect('/admin/error');
            }
            res.redirect('/admin/managecontent/greeting');
        });
    } else {
        req.session.error = true;
        res.redirect('/admin/error');
    }
});

router.get('/representative', csrfProtection, signInCheck, (req, res) => {
    greetings.findOne({
        person_type: req.query.gender
    }, (err, data) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        if (data == null) {
            res.render('admin/managecontent/greeting/editGreeting', {
                _csrf: req.csrfToken(),
                person_type: req.query.gender,
                greeting_text: '',
                image_ext: ''
            });
        } else {
            res.render('admin/managecontent/greeting/editGreeting', {
                _csrf: req.csrfToken(),
                person_type: data.person_type,
                greeting_text: data.greeting_text,
                image_ext: data.image_ext
            });
        }
    });
});

router.post('/representative', parseForm, csrfProtection, signInCheck, (req, res) => {
    const greetingText = req.body.greeting_text;
    let imgExt = '';
    if (req.files !== null) {
        const savePath = "public/images/greetings/";
        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
        }
        imgExt = path.extname(req.files.imgfiles.name);
        const newImgName = 'representative_' + req.body.person_type + imgExt;
        fs.writeFile(savePath + newImgName, req.files.imgfiles.data, (err) => {
            if (err) {
                console.log(err);
                req.session.error = true;
                res.redirect('/admin/error');
            }
        })
    }
    if (req.body.updateflag === 'false') {
        const model = new greetings({
            person_type: req.body.person_type,
            greeting_text: greetingText,
            image_ext: imgExt
        });
        model.save((err) => {
            if (err) {
                console.log(err);
                req.session.error = true;
                res.redirect('/admin/error');
            }
            res.redirect('/admin/managecontent/greeting');
        });
    } else if (req.body.updateflag === 'true') {
        greetings.update({
            person_type: req.body.person_type
        }, {
            person_type: req.body.person_type,
            greeting_text: greetingText,
            image_ext: imgExt
        }, (err) => {
            if (err) {
                console.log(err);
                req.session.error = true;
                res.redirect('/admin/error');
            }
            res.redirect('/admin/managecontent/greeting');
        });
    } else {
        req.session.error = true;
        res.redirect('/admin/error');
    }

});

module.exports = router;