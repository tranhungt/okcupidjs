module.exports = {
    URLS: {
    login: 'https://www.okcupid.com/login',
    rate: 'http://www.okcupid.com/quickmatch',
    visit_user: 'http://www.okcupid.com/profile/{username}',
    user_profile: 'http://www.okcupid.com/profile/{username}?okc_api=1',
    user_questions: 'http://www.okcupid.com/profile/{username}/questions?okc_api=1&low={low}',
    user_questions_no_api: 'http://www.okcupid.com/profile/{username}/questions?low={low}',
    get_visitors: 'http://www.okcupid.com/visitors?okc_api=1',
    quickmatch: 'http://www.okcupid.com/quickmatch?okc_api=1',

    // OAuth API
    get_messages: 'https://www.okcupid.com/1/apitun/messages',
    get_thread: 'https://www.okcupid.com/1/apitun/messages/conversations/{thread_id}',

    like: 'https://www.okcupid.com/1/apitun/profile/{userid}/like',
    unlike: 'https://www.okcupid.com/1/apitun/profile/{userid}/unlike',
    send_message: 'https://www.okcupid.com/1/apitun/messages/send',
    search: 'https://www.okcupid.com/1/apitun/match/search',
    edit_profile: 'https://www.okcupid.com/1/apitun/profile/save_essay',
    connections: 'https://www.okcupid.com/1/apitun/connections/outgoing',
  },
  SELECTORS: {
    current_page_selector : ".count > .curpage",
    total_pages_selector : ".count > .last",
    question_not_answered_selector : "div.question.not_answered",
    question_answered_selector : "div.question.public",
    question_text_selector : ".qtext > p",
    question_answer_selector : "p.answer.target"
  }
}

