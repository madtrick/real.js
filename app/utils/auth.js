var redefine = require('redefine');
var params   = require('./params');
var hello = require('hellojs');


hello.init({google:  '147125267354-eg1dootuvr0odr0blj9q5ge66adqtohl.apps.googleusercontent.com'});

var Auth = redefine.Class({
  statics: {
    start: function(clientId, redirectUri, callback){
      if (!params().token) {
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
