var request = require('request')
var constants = require('../custom_modules/constants')
var headers = require('../custom_modules/headers')

var cookie_jar = request.jar()
var request = request.defaults({jar: cookie_jar, strictSSL: false})


var Requester = function(){
}

Requester.prototype.postRequest = function(endpoint, data, callback){
    request({
        method: 'POST', 
        url: endpoint, 
        form: data, 
        headers: headers.getHeaders(), 
        json: true
        },
        callback)
}

Requester.prototype.postJsonRequest = function(endpoint, data, callback){
    request({
        method: 'POST', 
        url: endpoint, 
        body: data, 
        headers: headers.getHeaders(), 
        json: true
        },
        callback)
}

Requester.prototype.getRequest = function(endpoint, callback){
    request({
        method: 'GET', 
        url: endpoint, 
        headers: headers.getHeaders(), 
        json: true
        }, 
        callback)
}

module.exports = Requester