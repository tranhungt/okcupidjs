require('dotenv').config();

var OKCupid = require('okcupidjs');
var okc = new OKCupid();

//login
okc.login(process.env.OKC_USERNAME, process.env.OKC_PASSWORD, function(err, res, body) {
  var base_query = {
    // Primary filter
    "order_by": "MATCH", // "LOGIN" | "MATCH_AND_DISTANCE" | "ENEMY" | "MATCH"
    "i_want": "women", // "men" {
    "they_want": "men", // "women" | "everyone"
    "minimum_age": 20,
    "maximum_age": 30,
    "radius": 10, // miles from location
    "last_login": 604800, // seconds since last login
    "minimum_height": 61*254,
    "maximum_height": 68*254,
    // "minimum_attractiveness": 2000,
    "bodytype": ["thin", "fit"],
    // "availability": "single",
    "monogamy": "yes",
    "education": ["post_grad", "college_university"],
    "limit": 5
  }

  function search(okc, query, count) {
    let peopleReached = 0;
    okc.search(query, function(err,res,body) {
      // console.log(body)
      body.data.forEach(function(user) {
        let userArray = [];
        userArray.push(user.userid);
        console.log(userArray);

        function likeUserArray (userArray) {
          userArray.forEach(user_id => {
            okc.like(user_id);
            console.log("Liked user.")
          });
        }
        function messageUserArray (userArray) {
          userArray.forEach(user_id => {
            okc.sendMessage(user_id, "Hello.");
            console.log("Messaged user.")
          });
        };
        likeUserArray(userArray);
        messageUserArray(userArray);
        peopleReached = peopleReached + 1
      });
      console.log(`You reached ${peopleReached} people.`);

      // get next page with "after" cursor
      var hash = body.paging.cursors.after;

      // check termination condtion, otherwise recurse
      if (hash != null && count <= 5) {
        // get the query with the next hash
        query.after = hash;
        // increase the count
        newCount = count + body.data.length;
        // recursively call the search function
        search(okc, query, newCount);
      };
    });
  };
  search(okc, base_query, 1);
});
