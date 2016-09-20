var express = require('express');
var router = express.Router();

var comment_list = [];
var news_id_list = [1,2,3,4,5,6,7,8]

router.post('/add',function (req,res) {
    var body = req.body;
    if(!body.comment){
        res.status(200).send(notSatisfy('comment can not be null'))
        return;
    }
    if(!body.news_id) {
        res.status(200).send(notSatisfy('news id can not be null'))
        return;

    }
    if(news_id_list.indexOf(parseInt(body.news_id)) < 0) {
        res.status(200).send(notSatisfy('there is no news indexed ' + body.news_id))
        return;

    }
    comment_list.push({
        news_id : body.news_id,
        comment : body.comment
    });
    res.status(200).send({
        state:1,
        des:'comment success',
        data:null
    });

})



router.get('/list',function (req,res) {
    res.status(200).send(comment_list);
})
function notSatisfy(des) {
    return {
        state:0,
        des: des,
        data:null
    }
}

module.exports = router;
