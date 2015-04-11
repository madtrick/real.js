/** @jsx React.DOM */
'use strict';

require('./ext/backbone');

var Router = require('./router.react');
var Auth   = require('./utils/auth');
var Gapi   = require('./adapters/gapi');

var config = require('../config');

Auth.start(config.googleClientId, config.googleRedirectUri, function(){
  Gapi.load()
    .then(Gapi.init)
    .then(
      function(){
        try {
          Router.run();
        } catch (e) {
          // If I don't log the error here then
          // the promise library used by the Hello.js library
          // will catch it and only reject the promise. This
          // will silence all kinds of errors making development
          // a pain in the ass.
          //
          // Capturing the error here and printing the error
          // message is something.
          console.error(e.stack);
        }

    })
    .catch(function(error){
      // Same as above
      console.error(error.stack);
    })
});
