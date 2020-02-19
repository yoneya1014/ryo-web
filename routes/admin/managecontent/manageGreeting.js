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

router.get('/secretary', csrfProtection, signInCheck, (req, res) => {
    greetings.findOne({
        person_type: "secretary"
    }, (err, data) => {
        if (err) {
            console.log(err);
            req.session.error = true;
            res.redirect('/admin/error');
        }
        res.render('admin/managecontent/greeting/editGreeting', {
            _csrf: req.csrfToken(),
            person_type: data.person_type,
            greeting_text: data.greeting_text,
            image_ext: data.image_ext
        });
    });
});

router.post('/secretary', parseForm, csrfProtection, signInCheck, (req, res) => {
    console.log(req);
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
                res.redirect('/admin/error')
            }
        })
    }

    greetings.update({
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
});

module.exports = router;