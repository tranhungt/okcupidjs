var request = require('request')
var constants = require('../custom_modules/constants')
var headers = require('../custom_modules/headers')

var cookie_jar = request.jar()
var request;


var Requester = function(proxy){
    // proxy must be of format http://username:password@ip:port or http://ip:port
    request = request.defaults({jar: cookie_jar, strictSSL: false, proxy: proxy})
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

Requester.prototype.buildQueryString = function(query) {
    var queryStrings = []

    for (var key in query) {
        if (query.hasOwnProperty(key)) {
            queryStrings.push(key + '=' + query[key])
        }
    }

    return queryStrings.length === 0 ? '' : '?' + queryStrings.join("&")
}

module.exports = Requester