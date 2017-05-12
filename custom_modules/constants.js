module.exports = {
    URLS: {
    login: 'https://www.okcupid.com/login',
    rate: 'http://www.okcupid.com/quickmatch',
    visit_user: 'http://www.okcupid.com/profile/{username}',
    user_profile: 'http://www.okcupid.com/profile/{username}?okc_api=1',
    user_questions: 'http://www.okcupid.com/profile/{username}/questions?okc_api=1&low={low}',
    get_visitors: 'http://www.okcupid.com/visitors?okc_api=1',
    quickmatch: 'http://www.okcupid.com/quickmatch?okc_api=1',
    get_messages: 'https://www.okcupid.com/messages?okc_api=1',
    get_thread: 'https://www.okcupid.com/messages?okc_api=1&readmsg=true&threadid={thread_id}',
    
    // OAuth API
    like: 'https://www.okcupid.com/1/apitun/profile/{userid}/like',
    unlike: 'https://www.okcupid.com/1/apitun/profile/{userid}/unlike',
    send_message: 'https://www.okcupid.com/1/apitun/messages/send',
	}
}
