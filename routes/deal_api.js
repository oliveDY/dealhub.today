let express = require('express');
let router = express.Router();
let Deal = require("../models/deal.js");
let passport = require("passport");
let auth_middleware = require('../middleware/auth.js');
let Like = require("../models/like.js");
/**
 * CREATE: Post a new deal
 * */
router.post('/', auth_middleware.tokenVerify, function (req, res) {
    let user = req.body.user;

    if (req.query.fromLink) {
        // TODO: parse link automatically
        let newDeal = new Deal({
            author: {
                id: user.id,
                username: user.username
            },
            link: req.body.link,
        });
        newDeal.save(function(err){
           if (err) {
               console.log(err);
               return res.json({success: false, msg: 'Failed to save.'});
           }
           return res.json({success: true, msg: 'New deal!'});
        });
    } else {
        // TODO:
        let newDeal = new Deal({
                title: req.body.title,
                discount: req.body.discount,
                link: req.body.link,
                author: {
                    id: user.id,
                    username: user.username
                }
        });
        newDeal.save(function(err){
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Failed to save.'});
            }
            return res.json({success: true, msg: 'New deal added!'});
        });
    }
});

/**
* Get ALL deals id list
* */
router.get("/", function (req, res) {
    if(req.query.searchString) {
        Deal.find({$text:{$search : req.query.searchString}}).exec(function(err, deals) {
            if(err) {
                return res.json({success: false, msg: 'no deal found!'});
            }
            var id_list = [];
            deals.forEach(function(deal) {
                id_list.push(deal.id);
            });
            return res.json({"id_list" : id_list});
        });
    }
    else {
        Deal.find({},function(err, deals){
            if(err) {
                return res.json({success: false, msg: 'no deal found!'});
            }
            let id_list = [];
            deals.forEach(function(deal) {
                id_list.push(deal.id);
            });
            return res.json({"id_list" : id_list});
        });
    }

});

/**
* Get ALL top 10 liked deals
* */
router.get("/", function (req, res) {
    if(req.query.searchString) {
        Deal.find({$text:{$search : req.query.searchString}}).exec(function(err, deals) {
            if(err) {
                return res.json({success: false, msg: 'no deal found!'});
            }
            var id_list = [];
            deals.forEach(function(deal) {
                id_list.push(deal.id);
            });
            return res.json({"id_list" : id_list});
        });
    }
    else {
        Deal.find({},function(err, deals){
            if(err) {
                return res.json({success: false, msg: 'no deal found!'});
            }
            let id_list = [];
            deals.forEach(function(deal) {
                id_list.push(deal.id);
            });
            return res.json({"id_list" : id_list});
        });
    }

});



/**
 * Get ALL searched deals id list
 * */
router.get("/search/:query", function (req, res) {
    Deal.find({$text:{$search : req.params.query}}).exec(function(err, deals) {
        if(err) {
            return res.json({success: false, msg: 'no deal found!'});
        }
        var id_list = [];
        deals.forEach(function(deal) {
            id_list.push(deal.id);
        });
        return res.json({"id_list" : id_list});
    });
});

/**
 * Get ALL comments list by deal_id
 * */
router.get("/comment/:id", function(req, res) {
    Deal.findById(req.params.id, function (err, foundDeal) {
        if(err || !foundDeal) {
            return res.json({success: false, msg: 'Cannot find the deal!'});
        }
        else {
            console.log(foundDeal);
            var comment_list = foundDeal.comments;
            return res.json({"comment_list" : comment_list});
        }
    });
});

/**
 * Get the total number of comments by a certain deal_id
 * */
router.get("/commentnum/:id", function(req, res) {
    Deal.findById(req.params.id, function (err, foundDeal) {
        if(err || !foundDeal) {
            return res.json({success: false, msg: 'Cannot find the deal!'});
        }
        else {
            var comment_num = foundDeal.comments.length;
            return res.json({"comment_num" : comment_num});
        }
    });
});

/**
 * READ: get an deal by id
 * */
router.get("/detail/:id", function(req, res) {
    Deal.findById(req.params.id, function(err, foundDeal) {
        if(err || !foundDeal) {
            return res.json({success: false, msg: 'Searched deal not exist!'});
        }
        else {
            return res.json(foundDeal);
        }
    });
});

/**
* UPDATE: update an object by id
* */
/*TODO: check if the same user before edit*/
router.put("/:id", auth_middleware.tokenVerify, function(req, res) {
    Deal.findByIdAndUpdate(req.params.id,
        {$set:{
                title: req.body.title,
                discount: req.body.discount,
                link: req.body.link,
                image: req.body.image
        }}, function(err, updatedDeal) {
        if(err) {
            return res.json({success: false, msg: 'Failed to save.'});
        }
        else {
            return res.json(updatedDeal);
        }
    });
});

/**
 * DELETE: delete an object by id
 * */
router.delete("/:id", auth_middleware.tokenVerify, function(req, res) {
    Deal.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            return res.json({success: false, msg: 'Failed to delete!'});
        }
        else {
            Like.remove({'deal.id':req.params.id}, function(err) {
                if(err) {
                    return res.json({success: false, msg: 'Failed to delete Like!!!!'});
                }
                else {
                    return res.json({success: true, msg: 'Delete the Like related to deal successfully!'});
                }
            });
        }
    });
});

/**
 * UPDATE: update the image field by id
 * */
/*TODO: check if the same user before edit*/
router.put("/uploadimage/:id", auth_middleware.tokenVerify, function(req, res) {
    Deal.findByIdAndUpdate(req.params.id,
        {$set:{image: req.body.image}}, function(err, updatedDeal) {
            if(err) {
                return res.json({success: false, msg: 'Failed to save.'});
            }
            else {
                return res.json(updatedDeal);
            }
        });
});

/**
 * Find the TOP 10 Liked deals and return
 */



module.exports = router;