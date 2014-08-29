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
It gets you a new user in the area. Json body will contain target_userid and username for yoou to call `.rate`, `.visitUser`, `.getUserProfile`.

*Username is obtained via `body.sn`*

*Target_userid is obtained via `body.tuid`*

---
`.visitUser(username, callback)`

Takes a username. This visit method will emulate you actually visiting the user via browser. 

*Will register on the user's visitors list,* so they will know you visited them.


`.rate(target_userid, score, callback)`

Takes a user_id and a score rating integer (1-5). This is equivalent to the 1-5 star rating.

---
`.getUserProfile(username, callback)`

Returns a json of the user profile. Contains all the information as you would see if you visited the user's profile via browser. This will not register your name under the user's "visitor" list.

---
`.getVisitors(callback)`

Returns a list of your "stalkers" who have visited you.


Collaboration
=============
Feel free to send suggestions, ask questinos, or report issues via the issues board.
Pull requests and feature enhancements are very welcome.

Credits
-------
Copyright &copy; 2014 Hung Tran

Released under the MIT License, which can be found in the repository in `LICENSE.txt`.