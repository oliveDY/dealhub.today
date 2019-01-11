let middlewareObj = {};
let passport = require('passport');//Passport is Express-compatible authentication middleware for Node.js.
let config = require('../config/index');
let jwt = require('jsonwebtoken');
let morgan = require('morgan');

/*
* Function to Get authenticated token
* */
middlewareObj.getToken = function (headers) {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

/**
 * Verify request containing a valid token
 * */
middlewareObj.tokenVerify = function(req, res, next) {
    let token = middlewareObj.getToken(req.headers);
    if (token) {
        // verify token validation
        jwt.verify(token, config.secret, function(err, user) {
            if (err || !user) {
                return res.status(401).send({success: false, msg: 'Unauthorized. Invalid token.'});
            }
            // add decoded user information into request body
            req.body.user = user;
            next();
        })
    } else {
        // no token in request, not logged in
        return res.status(401).send({success: false, msg: 'Unauthorized. No token found.'});
    }
};

module.exports = middlewareObj;