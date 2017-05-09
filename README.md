OKCupidjs
=========
Automate your OKCupid Activity. This is an API Wrapper for OkCupid App, allowing you to automate processes and collect data for further analysis.


Installation
===========
`npm install --save okcupidjs`


Usage
=====

Require and Instantiate OKCupidjs
```
var OKCupid = require('okcupidjs')

var okc = new OKCupid()
```

Library Method Conventions
==========================
NOTE:
All methods are Asynchronous, and will return a standard `(err, res, body)` params to your callback.
Body will already be json parsed into a json object for easy handling.


Methods
=======

---
`.login(username, password, callback)`

Call this first to authenticate before calling other methods.

Takes a username and password, the same ones you use to login on the okc website.

Upon success, response will automatically store a cookie for subsequent requests.

---
`.getQuickmatch(callback)`

This is the method you want to call first.
It gets you a new user in the area. Json body will contain target_userid and username for you to call `.rate`, `.visitUser`, `.getUserProfile`.

*Username is obtained via `body.sn`*

*Target_userid is obtained via `body.tuid`*

---
`.visitUser(username, callback)`

Takes a username. This visit method will emulate you actually visiting the user via browser.

*Will register on the user's visitors list,* so they will know you visited them.

---

`.like(user_id, callback)`

Takes a username. Will cause you to like the user associated with that user ID.

---

`.unlike(user_id, callback)`

Takes a user ID. Will cause you to unlike the user associated with that user ID. 

---
`.getUserProfile(username, callback)`

Returns a json of the user profile. Contains all the information as you would see if you visited the user's profile via browser. This will not register your name under the user's "visitor" list.

---
`.getUserQuestions(username, low, callback)`

Returns a json of user question data, beginning with the "low" question.

The OkCupid API enforces pagination and won't return more than 10 questions per request, so to fetch all question data for a user, you need to make multiple calls and increment the "low" value. The index of a user's first answered question is 1. (Passing a value of 0 returns nothing.) For example:

```
okc.getUserQuestions(username, 1, cb) // First 10 questions
okc.getUserQuestions(username, 11, cb) // Next 10 questions
// Etc...
```

*Total number of questions for a user is obtained via `body.pagination.raw.total_num_results`*

---
`.getVisitors(callback)`

Returns a list of your "stalkers" who have visited you.


Collaboration
=============
Feel free to send suggestions, ask questinos, or report issues via the issues board.
Pull requests and feature enhancements are very welcome.

Credits
-------
Copyright &copy; 2014 [Hung Tran](http://hungtran.co)
For reference, I wrote a small piece on OKCupid, online dating, and data privacy here:
[http://hungtran.co/online-dating-and-personal-data-discovering-okcupids-api/](http://hungtran.co/online-dating-and-personal-data-discovering-okcupids-api/)

Released under the MIT License, which can be found in the repository in `LICENSE.txt`.
