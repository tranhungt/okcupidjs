var request = require('request')
var constants = require('../custom_modules/constants')

var cookie_jar = request.jar()
var request = request.defaults({jar: cookie_jar, strictSSL: false})
var HEADERS = constants.HEADERS


var Requester = function(){
}

Requester.prototype.postRequest = function(endpoint, data, callback){
    request({
        method: 'POST', 
        url: endpoint, 
        form: data, 
        headers: HEADERS, 
        json: true
        },
        callback)
}

Requester.prototype.getRequest = function(endpoint, callback){
    request({
        method: 'GET', 
        url: endpoint, 
        headers: HEADERS, 
        json: true
        }, 
        callback)
}

module.exports = Requester