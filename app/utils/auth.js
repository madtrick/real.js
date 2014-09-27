var redefine = require('redefine');
var params   = require('./params');


hello.init({google: '147125267354-dbe525glo5mn7jmjnm1cf0hcub4igueh.apps.googleusercontent.com'});

var Auth = redefine.Class({
  statics: {
    start: function(){
      if (!params().token)
        hello.login('google', {redirect_uri: 'http://127.0.0.1:3000/auth/google_oauth2/callback', response_type: 'code', display: 'page', scope: ['https://www.googleapis.com/auth/userinfo.email']})

    },

    token: function(){
      return params().token;
    }
  }
});

module.exports = Auth;
