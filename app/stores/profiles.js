var Fluxxor  = require('fluxxor');
var Promise  = require('promise');
var _        = require('lodash');
var Gapi     = require('../adapters/gapi');

var ProfilesStore = Fluxxor.createStore({
  initialize: function(options){
    this.collection = options.collection;

    this.bindActions(
      'FETCH_PROFILES', this.handleAction_fetchProfiles
    );
  },

  profiles: function(){
    return this.collection;
  },

  handleAction_fetchProfiles: function(payload){
    var store    = this;
    var promises = _.map(payload.ids, function(id){
        return Gapi.profile(id).then(function(profile){
          store.collection.add(profile);
        });
      });

    Promise.all(promises).done(function(){
      store.emit("change");
    });
  }

});

module.exports = ProfilesStore;
