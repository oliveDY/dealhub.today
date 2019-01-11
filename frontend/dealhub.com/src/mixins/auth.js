import config from './config.js';
import * as Cookies from "js-cookie";

let request = require("request");
export default {
    signin: function(username, password, cb) {
        request.post(
            {
                url: config.domain_name + '/api/auth/signin',
                form: {
                    "username": username,
                    "password": password
                }
            },
            function(err, httpResponse, body) {
                cb(err, httpResponse, JSON.parse(body));
            }
        );
    },
    signup: function(username, password, cb) {
        request.post(
            {
                url: config.domain_name + '/api/auth/signup',
                form: {
                    "username": username,
                    "password": password
                }
            },
            function(err, httpResponse, body) {
                cb(err, httpResponse, JSON.parse(body));
            }
        );
    },
    token_check: function(cb) {
        let token = Cookies.get("dealhub.today");
        cb(token);
    },
    token_remove: function() {
        Cookies.remove('dealhub.today');
        Cookies.remove('dealhub.today.id');
    },
    user_id_get: function (cb) {
        let user_id = Cookies.get('dealhub.today.id');
        cb(user_id);
    }

}