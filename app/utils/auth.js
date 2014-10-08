var redefine = require('redefine');
var params   = require('./params');
var hello = require('hellojs');



var Auth = redefine.Class({
  statics: {
    start: function(clientId, redirectUri, callback){
      if (!params().token) {
        hello.init({google:  clientId});
          hello.login('google', {redirect_uri: redirectUri, response_type: 'code', display: 'page', scope: ['https://www.googleapis.com/auth/userinfo.email']});
      } else
        callback();
    },

    token: function(){
      return params().token;
    }
  }
});

module.exports = Auth;
