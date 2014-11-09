var Promise = require('promise');
var config  = require('../../config')

var scope    = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/plus.login'];

window.onLoadGapi = onLoadGapi;
function onLoadGapi(resolve, reject){
  gapiAdapter._loadResolve();
}

var gapiAdapter = {
  load: function(){
    return new Promise(function(resolve){
      var tag            = document.createElement('script'),
          firstScriptTag = document.getElementsByTagName('script')[0];

      tag.src = "https://apis.google.com/js/client.js?onload=onLoadGapi";
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      gapiAdapter._loadResolve = resolve;
    });
  },
  init: function(){
    return new Promise(function(resolve, reject){
      gapi.auth.init();
      gapi.auth.authorize({
        immediate: false,
        client_id: config.googleClientId,
        scope: scope
      }, function(response){
        response.error ? reject() : resolve();
      });
    });
  },
  profile: function(id){
    return new Promise(function(resolve, reject){
      gapi.client
        .request({path: 'plus/v1/people/' + id})
        .execute(function(response){
          resolve({
            id: id,
            image: response.image.url.replace("size=50", "size=80px")
          });
      });
    });
  }

};
module.exports = gapiAdapter;
