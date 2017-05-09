var oauth_token = ''

// Sets the OAuth token. Used by client when logging in.
function setOAuthToken(token) {
  oauth_token = token
}

// Avaliable if client should need to clear the OAuth token.
function clearOAuthToken() {
  oauth_token = ''
}

// Will return the header with the OAuth token if token has been set.
function getHeaders() {
  if (oauth_token) {
    return {
        'x-okcupid-platform':'DESKTOP', 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
        'authorization' : 'Bearer ' + oauth_token
      }
  }
  else {
    return {
      'x-okcupid-platform':'DESKTOP', 
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
    }
  }
}

module.exports = {
  getHeaders: getHeaders,
  setOAuthToken: setOAuthToken,
  clearOAuthToken: clearOAuthToken
}

