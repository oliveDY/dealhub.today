import config from './config.js';
let request = require("request");// send HTTP request from frontend to backend API
export default {
    new_comment : function (comment_info,cb) {
        console.log(comment_info);
        request.post({
            url: config.domain_name + '/api/comment/' + comment_info.deal_id,
            form: {
                'text' : comment_info.text
            }
            ,
            headers: {
                'Authorization' : "Bearer " + comment_info.token
            }
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    comment_detail : function(comment_id, cb) {
        request.get({
            url: config.domain_name + '/api/comment/' + comment_id
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    comment_delete : function(comment_id, token, cb) {
        request.delete({
            url: config.domain_name + '/api/comment/' + comment_id,
            headers: {
                'Authorization' : "Bearer " + token
            }
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    }
}