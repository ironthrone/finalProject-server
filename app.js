var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var path = require('path');
// var fs = require('fs');

var mongoUrl = (process.env.MONGODB_URI || 'mongodb://localhost:27017/mean');
var port = (process.env.PORT || 5000);

var app = express();
app.use(express.static(path.join(__dirname,'resource')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var db;
var COMMENT_COLLECTION = "comment";

mongodb.MongoClient.connect(mongoUrl,function(err,database){
	if(err){
		console.log(err);
		process.exit(1);
	}

	db = database;

    var server = app.listen(port, function () {
    	var port = server.address().port;
        console.log('Started,now  listening on port ',port);
    });

});


function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  var response = {};
  response.status = code;
  response.message = message;
  response.results = null;
  res.status(code || 500).json({'response':response});
}



/*
 comment :{
	contentId:<String>
	content: <String>
	id:<ObjectId>
	timestamp:<Date>
 }
 return: 
 response:{
    status:<int>,
    message:<String>,
    results:<Object or Array>
 }
*/
app.post('/comment/add',function (req,res) {
    var comment = req.body;
    comment.timestamp = Date.now();

    if(!comment.contentId) {
        handleError(res,"Invalid user input","contentId can not be null",400);
        return;

    }
    if(!comment.content){
        handleError(res,"Invalid user input","Content can not be null",400);
        return;
    }
    
    db.collection(COMMENT_COLLECTION).insertOne(comment, function(err,doc){
        if(err){
            handleError(res,err.message,"Fail to create new comment",500);
        }else {
            res.status(200).json({'response':{status:1,message:"Success",results:comment}});
        }
    });
})

app.post('/comment/list',function (req,res) {
    var contentId = req.body.contentId;
    if(!contentId){
      handleError(res,"Invalid user input","ContentId can not be null",400);
      return;
    }
    db.collection(COMMENT_COLLECTION).find({contentId:contentId}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.",500);
    } else {
      res.status(200).json({'response':{status:1,message:null,results:docs}});
    }
  });
});

app.get('/update',function(req,res){
    // var latestFile = null;
    // fs.readdir('resource',function(err,files){
    //     files.forEach( file => {
    //         if(latestFile) latestFile = file;

    //     });
    // })；
    res.download('resource/app/app.apk');
});