//JWT jsonwebtoken -> token 

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require ('passport');
var authenticate = require('./authenticate');
var auth = require('./verify');
var cors = require('cors');
const bodyparser = require('body-parser');

const testurl = 'mongodb://localhost:27017/test_jobseeker';
const url = 'mongodb://localhost:27017/jobseeker_2019';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
});

connect.then((db) => {
    console.log("Connected to mongodb server running on 3000 port");
}, (err) => { console.log(err); });

//Giving routes path here
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/uploads');
var CvRouter = require('./routes/cv');
var jobpostsRouter = require('./routes/jobposts');
var publishersRouter = require('./routes/publishers');
var seekersRouter = require('./routes/seekers');
var commentsRouter = require('./routes/comments')
var postRouter = require('./routes/post');
var userRouter = require('./routes/user');
var applyRouter = require('./routes/apply');
var messageRouter = require('./routes/message');
var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: 'session-id',
    secret: 'mysessionkey',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

// yo tala ko..
//esmma afno frontend ko url use gara #bibash

app.use('*', cors({
    origin: 'http://192.168.5.110:5502',
    credentials: true
}));

// yo auth paxi use gara backend kamm sakera.. last ma milau ne ho frontend vayo vane..

function auth(req, res, next) {
    console.log(req.user);
    if (!req.user) {
        let err = new Error("You are not authenticated!");
        err.status = 403;
        return next(err);
    } else {
        next();
    }
 }


// using routes here

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/message', messageRouter);
 app.use(auth);
app.use('/uploads', uploadRouter);
app.use('/cvupload', CvRouter);
app.use('/jobposts', jobpostsRouter);
app.use('/publishers', publishersRouter);
app.use('/seekers', seekersRouter);
app.use('/comments', commentsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/apply', applyRouter);

module.exports = app;
