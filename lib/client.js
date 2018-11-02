var constants = require('../custom_modules/constants')
var headers = require('../custom_modules/headers')
var Requester = require('./requester')
var cheerio = require('cheerio')

var URLS = constants.URLS
var SELECTORS = constants.SELECTORS

function getProxyString(proxy){
    return `http://${(proxy.username && proxy.password) ? `${proxy.username}:${proxy.password}@` : ''}${proxy.ip}:${proxy.port}`
}

function parseQuestions(html, low, maxPageCount = null) {
    var $ = cheerio.load(html);
    var questionsData = {
      questions: {
        public: [],
        hidden: []
      },
      pagination: {
        low: low,
        next_page_low: low + 10,
        done: false,
        current_page: $(SELECTORS.current_page_selector).text(),
        total_num_pages: $(SELECTORS.total_pages_selector).text()
      }
    };  
    questionsData.pagination.done = questionsData.pagination.current_page == questionsData.pagination.total_num_pages || questionsData.pagination.current_page == maxPageCount;
    const answeredQuestions = $(SELECTORS.question_answered_selector);
    const notAnsweredQuestions = $(SELECTORS.question_not_answered_selector);
    answeredQuestions.each(function(i, elem) {    
      const question = $(this).find(SELECTORS.question_text_selector).text().trim();
      const answer = $(this).find(SELECTORS.question_answer_selector).text().trim();
      questionsData.questions.public.push({ question, answer })
    });
    notAnsweredQuestions.each(function(i, elem) {    
      const question = $(this).find(SELECTORS.question_text_selector).text().trim();
      const answer = $(this).find(SELECTORS.question_answer_selector).text().trim();
      questionsData.questions.hidden.push({ question, answer })
    });
    return questionsData;
}

var OKCupid = function(proxy = null){
    this.requester = new Requester(proxy)
    this.proxy = proxy;
}

OKCupid.prototype.proxyTest = function(cb){
    const _proxyTestUrl = 'https://www.whatismyip.com/'
    this.requester.getRequestHtml(_proxyTestUrl, function(err, res, body){
        if(err) cb(err, res, body)
        else cb(err, res, body.indexOf(this.proxy) != -1)
    })
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
/*
OKCupid.prototype.getUserQuestions = function(username, low, callback){
    var user_questions_url = URLS.user_questions.replace('{username}', username).replace('{low}', low)
    this.requester.getRequest(user_questions_url, callback)
}*/

OKCupid.prototype.getUserQuestions = function(username, low, callback, maxPageCount = null){
    var user_questions_url = URLS.user_questions_no_api.replace('{username}', username).replace('{low}', low)
    this.requester.getRequestHtml(user_questions_url, function(err, res, body){
        if (err) callback(err, res, body)
        else {
            callback(err, res, parseQuestions(body, low, maxPageCount))
        }
    })
}

OKCupid.prototype.getAllUserQuestions = function(username, callback, maxPageCount = null){
    this.getUserQuestionsUntilDone(username, 1, callback, maxPageCount, [])
}

OKCupid.prototype.getUserQuestionsUntilDone = function(username, low, callback, maxPageCount, questionsSoFar) {
    var doAgain = (err, res, body) => {
        if (err) callback(err, res, questions)
        questionsSoFar = questionsSoFar.concat(body.questions)
        if(body.pagination.done) callback(err, res, questionsSoFar)
        else {
            this.getUserQuestionsUntilDone(username, body.pagination.next_page_low, callback, maxPageCount, questionsSoFar)
        }
    }
    this.getUserQuestions(username, low, doAgain, maxPageCount)
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

OKCupid.prototype.editProfile = function(essayid, contents, callback) {
    this.requester.postJsonRequest(URLS.edit_profile, {essay_pics: [], essayid, contents}, callback)
}

OKCupid.prototype.getLikes = function(options, callback) {
    var connections_url = URLS.connections + this.requester.buildQueryString(options)
    this.requester.getRequest(connections_url, callback)
}

module.exports = OKCupid
