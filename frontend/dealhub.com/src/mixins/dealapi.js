import config from './config.js';
let request = require("request");// send HTTP request from frontend to backend API
let queryString = require('query-string');
export default {
    new_deal : function (deal_info, token, cb) {
        request.post({
            url: config.domain_name + '/api/deal',
            form: deal_info,
            headers: {
                'Authorization' : "Bearer " + token
            }
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    delete_deal : function (deal_id, token, cb) {
        request.delete({
            url: config.domain_name + '/api/deal/' + deal_id,
            headers: {
                'Authorization' : "Bearer " + token
            }
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    edit_deal : function (deal_id, deal_info, token, cb) {
        request.put({
            url: config.domain_name + '/api/deal/' + deal_id,
            form: deal_info,
            headers: {
                'Authorization' : "Bearer " + token
            }
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    recent_deal : function (cb) {
        request.get({
            url: config.domain_name + '/api/deal/',
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    search_deal : function(search_string, cb) {
        let query = {
            searchString: search_string
        };
        request.get({
            url: config.domain_name + '/api/deal/?' + queryString.stringify(query),
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    deal_detail : function (deal_id, cb) {
        request.get({
            url: config.domain_name + '/api/deal/detail/' + deal_id
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    deal_comment : function (deal_id, cb) {
        request.get({
            url: config.domain_name + '/api/deal/comment/' + deal_id
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    deal_commentnum : function (deal_id, cb) {
        request.get({
            url: config.domain_name + '/api/deal/commentnum/' + deal_id
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    deal_image_upload : function (deal_id, deal_info, token, cb) {
        request.put({
            url: config.domain_name + '/api/deal/uploadimage/' + deal_id,
            form: deal_info,
            headers: {
                'Authorization' : "Bearer " + token
            }
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    }
}