import config from './config.js';
let request = require("request");// send HTTP request from frontend to backend API

export default {
    new_save : function (save_info, token, cb) {
        // console.log("save_info" + JSON.stringify(save_info));
        request.post({
            url: config.domain_name + '/api/save/' + save_info.deal_id,
            form: save_info,
            headers: {
                'Authorization' : "Bearer " + token
            }
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    get_saves_num : function (deal_id, cb) {
        request.get({
            url: config.domain_name + '/api/save/stars/' + deal_id
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    },
    check_save : function (deal_id, token, cb) {
        request.get({
            url: config.domain_name + '/api/save/saved/' + deal_id,
            headers: {
                'Authorization' : "Bearer " + token
            }
        }, function(err, httpResponse, body) {
            cb(err, httpResponse, JSON.parse(body));
        });
    }
}