require('dotenv').config();

const OKCupid = require('okcupidjs');
var Promise = require('bluebird');
var okc = Promise.promisifyAll(new OKCupid());
const baseQuery = {i_want: "men", they_want: "women" , radius: 25 };

const search = async () => {
  if (!process.env.USERNAME) {
    console.log('Env file does not exist. Rename .env.example to .env and set the username and password variables.');
    return;
  }
  if (process.env.USERNAME === 'username') {
    console.log("Set the username and password in the env file.");
    return;
  }
  try {
    await okc.loginAsync(process.env.USERNAME, process.env.PASSWORD);
    console.log('login done');
  } catch (e) {
    console.log('Failed to login. Check your username and password in the env file.');
    return;
  }
  console.log('searching...');

  let count = 0;

  const search = () => {
    okc.search(baseQuery, function(err,res,body) {
      body.data.forEach(function(user) {
        console.log(user.username);
      });
      var hash = body.paging.cursors.after;
      // check termination condtion, otherwise recurse
      if (hash != null && count <= 100) {
        count = count + body.data.length;
        search();
      }
    });
  };
  s
  search();
};

search();

