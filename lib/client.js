var constants = require('../custom_modules/constants')
var headers = require('../custom_modules/headers')
var Requester = require('./requester')

var URLS = constants.URLS

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
      if (!err && body.status !== 0) {
        err = {
          status: body.status, // a status number
          status_str: body.status_str, // descriptive error message
        }
      }
      // set the OAuth token in the custom header
      else if (body.oauth_accesstoken) {
        headers.setOAuthToken(body.oauth_accesstoken)
      }
      callback(err, res, body)
    })
}

OKCupid.prototype.visitUser =  function(username, callback){
  var user_profile_url = URLS.visit_user.replace('{username}', username)
  this.requester.getRequest(user_profile_url, callback)
}

OKCupid.prototype.like = function(target_userid, callback) {
  var like_url = URLS.like.replace('{userid}', target_userid)
  this.requester.postRequest(like_url, {}, callback)
}

OKCupid.prototype.unlike = function(target_userid, callback) {
  var unlike_url = URLS.unlike.replace('{userid}', target_userid)
  this.requester.postRequest(unlike_url, {}, callback)
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

OKCupid.prototype.sendMessage = function(user_id, message_body, callback){
    this.requester.postJsonRequest(URLS.send_message, {"body": message_body, "receiverid": user_id}, callback)
}

OKCupid.prototype.getRecentMessages = function(callback){
    this.requester.getRequest(URLS.get_messages, callback)
}

OKCupid.prototype.getMessageThread = function(thread_id, callback) {
    var thread_url = URLS.get_thread.replace('{thread_id}', thread_id)
    this.requester.getRequest(thread_url, callback)
}

OKCupid.prototype.search = function(options, callback) {
    this.requester.postJsonRequest(URLS.search, options, callback)
}

OKCupid.prototype.editProfile = function(edit_category, options, callback) {
    var edit_profile_url = URLS.edit_profile.replace('{editCategory}', edit_category)
    this.requester.postJsonRequest(edit_profile_url, options, callback)
}

OKCupid.prototype.getMatches = function(options, callback) {
    var connections_url = URLS.connections + this.requester.buildQueryString(options)
    this.requester.getRequest(connections_url, callback)
}

module.exports = OKCupid
