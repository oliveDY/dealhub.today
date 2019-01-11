let express = require('express');
let router = express.Router();
let Save = require("../models/save.js");
let Deal = require("../models/deal.js");
let passport = require("passport");
let auth_middleware = require('../middleware/auth.js');


/**
 * CRETE: create a star by click on star icon
 */
router.post('/:id', auth_middleware.tokenVerify, function (req, res) {
    let user = req.body.user;
    let newSave = new Save({
        deal : {
            id:req.params.id
        },
        user : {
            id: user.id
        }
    });
    newSave.save(function(err){
        if (err) {
            console.log(err);
            return res.json({success: false, msg: 'Failed to save new star.'});
        }
        return res.json({success: true, msg: 'New star added!'});
    });

});
/**
 * Get: get the number of stars according to deal_id
 * */
router.get("/stars/:id", function(req, res) {
    // query: use mongoose find method to find all stars under one deal.id
    Save.find({'deal.id' : req.params.id}, function (err, stars) {
        console.log(stars);
        if(err || !stars) {
            return res.json({success: false, msg: 'Cannot find the stars!'});
        }
        else {
            let stars_num = stars.length;
            return res.json({"saves_num" : stars_num});
        }
    });
});
/**
 * Get the saved deal by user_id && deal_id
 * */
router.get("/saved/:id", auth_middleware.tokenVerify, function(req, res) {
    Save.findOne({'user.id' : req.body.user.id, 'deal.id' : req.params.id}, function (err, foundSave) {
        if(err || !foundSave) {
            return res.json({success: false, msg: 'Cannot find the any matched save!'});
        }
        else {
            return res.json({success: true, msg: 'Have found one matched save!'});
        }
    });
});

module.exports = router;