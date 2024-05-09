var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var todoRouter = require('./routes/todos');

let customLogger = require('./middleware/logger');
let movieRouter = require('./routes/movies');
let reviewRouter = require('./routes/reviews');
let productRouter= require('./routes/ProductRoute')

let auth= require('./middleware/auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const { db } = require('./config/database');
const mongoose = require('mongoose');

app.use(customLogger.logger);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/todos', todoRouter)


app.use('/api/movies',auth.verifyUserToken, movieRouter);
app.use('/api/reviews',auth.verifyUserToken,reviewRouter);
app.use('/api/products',auth.verifyUserToken,productRouter)

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
    res.render('error');
});

module.exports = app;
