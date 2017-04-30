var constants = require('../custom_modules/constants')
var URLS = constants.URLS
var Requester = require('./requester')

var OKCupid = function(){
    this.requester = new Requester()
}

OKCupid.prototype.login = function(username, password, callback){
    var login_form = {
      okc_api: 1, 
      username: username, 
      password: password,
    };
    this.requester.postRequest(URLS.login, login_form, function(err, res, body) {
      // if there is a non-zero status in response and response does not show an error
      if (body.status !== 0 && !err) {
        err = { 
          status: body.status, // a status number
          status_str: body.status_str, // descriptive error message
        }
      }
      callback(err, res, body)
    })
}

OKCupid.prototype.visitUser =  function(username, callback){
  var user_profile_url = URLS.visit_user.replace('{username}', username)
  this.requester.getRequest(user_profile_url, callback)
}

OKCupid.prototype.rate = function(target_userid, score, callback){
    var data = {
        okc_api: 1,
        score: score,
        vote_type: 'personality',
        target_userid: target_userid
    }
    this.requester.postRequest(URLS.rate, data, callback)
}

OKCupid.prototype.getQuickmatch = function(callback){
    this.requester.getRequest(URLS.quickmatch, callback)
}

OKCupid.prototype.getUserProfile = function(username, callback){
    var user_profile_url = URLS.user_profile.replace('{username}', username)
    this.requester.getRequest(user_profile_url, callback)
}

OKCupid.prototype.getUserQuestions = function(username, low, callback){
    var user_questions_url = URLS.user_questions.replace('{username}', username).replace('{low}', low)
    this.requester.getRequest(user_questions_url, callback)
}

OKCupid.prototype.getVisitors = function(callback){
    this.requester.getRequest(URLS.get_visitors, callback)
}

module.exports = OKCupid
