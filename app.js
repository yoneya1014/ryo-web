require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

//router file
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
const adminIndexRouter = require('./routes/admin/index');
const signInRouter = require('./routes/admin/signIn');
const signOutRouter = require('./routes/admin/signOut');
const initRouter = require('./routes/admin/init');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session setup
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}));

//include router config
app.use('/', indexRouter);
app.use('/contact', contactRouter);
app.use('/admin', adminIndexRouter);
app.use('/admin/signin', signInRouter);
app.use('/admin/signout', signOutRouter);
app.use('/admin/init', initRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('common/error');
});

module.exports = app;