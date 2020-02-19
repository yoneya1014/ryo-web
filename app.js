require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const db_url = process.env.DB_STRING;

//Connect Mongo DB
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        console.log('Connection Failed:' + err);
    } else {
        console.log('Connection Succeed');
    }
});

//router file (Client)
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
const aboutRouter = require('./routes/dormitory');

//router file (Administrator)
const adminIndexRouter = require('./routes/admin/common');
const signInRouter = require('./routes/admin/manageuserinfo/signIn');
const signOutRouter = require('./routes/admin/manageuserinfo/signOut');
const initRouter = require('./routes/admin/manageuserinfo/init');
const changeAdminDataRouter = require('./routes/admin/manageuserinfo/changeAdminData');
const manageContentRouter = require('./routes/admin/managecontent/manageContent');
const manageTopicsRouter = require('./routes/admin/managecontent/manageTopics');
const manageFoodMenuRouter = require('./routes/admin/managecontent/manageFoodMenu');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload(undefined));

//Session Setup
app.use(session({
    secret: 'sasinoboru',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000,
        path: '/admin'
        //secureオプションはhttps通信を利用できるときのみtrueにする。
    },
    store: new mongoStore({
        url: db_url,
        autoReconnect: true,
        clear_interval: 3600
    })
}));

//XSS Protection Setup
app.use(helmet());

//include router config (Client)
app.use('/', indexRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);

//include router config (Admin)
app.use('/admin', adminIndexRouter);
app.use('/admin/signin', signInRouter);
app.use('/admin/signout', signOutRouter);
app.use('/admin/init', initRouter);
app.use('/admin/changeadmindata', changeAdminDataRouter);
app.use('/admin/managecontent', manageContentRouter);
app.use('/admin/managecontent/topics', manageTopicsRouter);
app.use('/admin/managecontent/foodmenu', manageFoodMenuRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('common/error');
});

module.exports = app;