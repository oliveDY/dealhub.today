import config from './config.js';
let request = require("request");// send HTTP request from frontend to backend API

export default {
    new_like : function (like_info, token, cb) {
        // console.log("info" + JSON.stringify(like_info));
        request.post({
            url: config.domain_name + '/api/like/' + like_info.deal_id,
            form: like_info,
            headers: {
                'Authorization' : "Bearer " + token
            }
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    get_likes_num : function (deal_id, cb) {
        request.get({
            url: config.domain_name + '/api/like/likes/' + deal_id
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    get_topdeal: function (cb) {
        request.get({
            url: config.domain_name + '/api/like/',
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    }
}