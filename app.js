var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
// var path = 
var comment = require('./routes/comment.js')

var mongoUrl = (process.env.MONGODB_URI || 'mongodb://localhost:27017/mean');
var port = (process.env.PORT || 5000);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/comment',comment);



app.listen(3000, function () {
    console.log('Started,now  listening on port 3000!');
});
