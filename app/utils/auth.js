'use strict';

var redefine = require('redefine');
var params   = require('./params');
var hello    = require('hellojs');



module.exports = redefine.Class({
  statics: {
    start: function(clientId, redirectUri, callback){
      if (!params().token) {
        hello.init({google: clientId});
        /*eslint camelcase: [2, {properties: "never"}]*/
        hello.login('google', {
          redirect_uri: redirectUri,
          response_type: 'code',
          display: 'page',
          scope: ['https://www.googleapis.com/auth/userinfo.email']
        });
      } else {
        callback();
      }
    },

    token: function(){
      return params().token;
    }
  }
});
