/* global gapi */
'use strict';

var Promise = require('promise');
var config  = require('../../config');

var scope    = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/plus.login'
];

var gapiAdapter;
module.exports = gapiAdapter = {
  load: function(){
    return new Promise(function(resolve){
      var tag            = document.createElement('script'),
          firstScriptTag = document.getElementsByTagName('script')[0];

      tag.src = 'https://apis.google.com/js/client.js?onload=onLoadGapi';
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      gapiAdapter._loadResolve = resolve;
    });
  },
  init: function(){
    return new Promise(function(resolve, reject){
      gapi.auth.init();
      gapi.auth.authorize({
        immediate: true,
        client_id: config.googleClientId,
        scope: scope
      }, function(inmendiateAuthResponse){
        if (inmendiateAuthResponse.error) {
          /*eslint camelcase: [2, {properties: "never"}]*/
          gapi.auth.authorize({
            immediate: false,
            client_id: config.googleClientId,
            scope: scope
          }, function(noInmediateAuthResponse){
            if (noInmediateAuthResponse.error) {
              reject();
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });
  },
  profile: function(id){
    return new Promise(function(resolve){
      gapi.client
        .request({path: 'plus/v1/people/' + id})
        .execute(function(response){
          resolve({
            id: id,
            image: response.image.url.replace('size=50', 'size=80px')
          });
      });
    });
  }

};

window.onLoadGapi = function(){
  gapiAdapter._loadResolve();
}
