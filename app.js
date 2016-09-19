var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
// var connection = require('./mysql_connect.js');
var session = require('express-session');
var comment = require('./routes/comment.js')

var upload = multer();
var app = express();

// app.use(multer())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    path: '/',
    secret: 'secret',
    cookie: {maxAge: 60 * 30 * 1000}
}));

app.use('/comment',comment);

app.listen(3000, function () {
    console.log('Started,now  listening on port 3000!');
});
