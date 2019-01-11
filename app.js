var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var logger = require('morgan');

mongoose.connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true });
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));// 叫override method在以_method开始的method找是否有override的情况
app.use(flash());
app.use(logger('dev'));
app.use(express.json());

// auth
let auth_api = require('./routes/auth_api.js');
app.use('/api/auth', auth_api);

// deal
let deal_api = require('./routes/deal_api.js');
app.use('/api/deal', deal_api);

//comment
let comment_api = require('./routes/comment_api.js');
app.use('/api/comment', comment_api);

//like
let like_api = require('./routes/like_api.js');
app.use('/api/like', like_api);

//save(star)
let save_api = require('./routes/save_api.js');
app.use('/api/save', save_api);

// CORS-ENABLE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(passport.initialize());

app.get('/', function(req, res) {
    res.send('Page under construction.');
});

// print出所用的port
var listener = app.listen(13455, process.env.IP, function() {
    console.log('Listening on port ' + listener.address().port);
});