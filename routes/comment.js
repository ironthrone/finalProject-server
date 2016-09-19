var express = require('express');
var router = express.Router();

var comment_list = [];

router.post('/add',function (req,res) {
    var body = req.body;
    if(!body.content){
        res.status(200).send({state: 0,
        desc : 'content can not be null',
        data : null})
    }


})

router.get('/list',function (req,res) {

})

module.exports = router;