let express = require("express");
let router = express.Router();
let Comment = require("../models/comment");
let Deal = require("../models/deal");
let passport = require("passport");
let auth_middleware = require('../middleware/auth.js');

/**
 * CREATE: create a new comment
 **/
router.post("/:id", auth_middleware.tokenVerify, function (req, res) {
    // find deal by id & add comment to the deal
    Deal.findById(req.params.id, function (err, foundDeal) {
        let user = req.body.user;
        if(err || !foundDeal) {
            console.log(req.params.id);
            return res.json({success: false, msg: 'Failed to find deal!'});
        }
        else {
            let comment = new Comment({
                author: {
                    id : user.id,
                    username : user.username
                },
                text: req.body.text,
                deal_id : {
                    id : foundDeal.id
                }
            });

            // save comment
            comment.save(function(err){
                if(err) {
                    return res.json({success: false, msg: 'Failed to save comment!'});
                }
                foundDeal.comments.push(comment);
                foundDeal.save();
                return res.json({success: true, msg:'New comment added!'})
            });
        }
    });
});

/**
 * UPDATE: update a comment
 **/
router.put("/:id", auth_middleware.tokenVerify, function (req, res) {
    let newComment = req.body.comment;
    Comment.findByIdAndUpdate(req.params.id,
        newComment
        ,function(err, updatedComment) {
        if(err) {
            return res.json({success: false, msg: 'Failed to find the comment!'});
        } else {
            return res.json(updatedComment);
        }
    });
});

/**
 * DELETE: delete a comment
 **/
router.delete("/:id", auth_middleware.tokenVerify, function (req, res) {
    Comment.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            return res.json({success: false, msg: 'Failed to remove the comment!'});
        } else {
            return res.json({success: true, msg: 'Remove the comment successfully!'});
        }
    });
});

/**
 * GET: get a comment by comment_id
 **/
router.get("/:id", function(req, res) {
    Comment.findById(req.params.id, function (err, foundComment) {
        if(err || !foundComment) {
            return res.json({success: false, msg: 'Searched comment not exist!'});
        }
        else {
            console.log(foundComment);
            return res.json(foundComment);
        }
    });
});

module.exports = router;