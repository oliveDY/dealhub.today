let express = require('express');
let router = express.Router();
let Like = require("../models/like.js");
let Deal = require("../models/deal.js");
let passport = require("passport");
let auth_middleware = require('../middleware/auth.js');


/**
 * CRETE: create a like by click on heart icon
 */
router.post('/:id', auth_middleware.tokenVerify, function (req, res) {
    let user = req.body.user;// 验证之后把当前user info 传入 req.body.user,因而我们可以通过这样获得
    let newLike = new Like({
        deal : {
            id:req.params.id// 保存deal_id
        },
        user : {
            id: user.id// 保存user_id
        }
    });
    newLike.save(function(err){
        if (err) {
            console.log(err);
            return res.json({success: false, msg: 'Failed to save new Like.'});
        }
        return res.json({success: true, msg: 'New Like added!'});
    });

});
/**
 * Get: get the number of likes according to deal_id
 * */
router.get("/likes/:id", function(req, res) {
    Like.find({'deal.id' : req.params.id}, function (err, likes) {
        console.log(likes);
        if(err || !likes) {
            return res.json({success: false, msg: 'Cannot find the likes!'});
        }
        else {
            let likes_num = likes.length;
            return res.json({"likes_num" : likes_num});
        }
    });
});

/**
 * Group by id and count: get the [{deal_id, count}] pair
 * */
router.get("/", function(req, res) {
    Like.aggregate([
        {$group:
                {_id : "$deal.id",
                count: {$sum : 1}}}, {$sort: {"count" : -1}}], function(err, results) {
            let final_list = [];
            if(err) {
                return res.json({success: false, msg: 'Cannot group by id and count!'});
            }
            else {
                // return res.json(results);
                for(var i = 0; i < 10; i++) {
                    final_list.push(results[i]);
                }
                return res.json({"final_list" : final_list});
            }
        });

});


module.exports = router;