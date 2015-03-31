var Reflux   = require('reflux');
var Promise  = require('promise');
var _        = require('lodash');
var Profiles = require('../collections/profiles');
var Gapi     = require('../adapters/gapi');
var actions  = require('../actions');

module.exports = Reflux.createStore({
  init: function(){
    this.collection = new Profiles();
    this.listenTo(actions.fetchProfiles, this.handleAction_fetchProfiles);
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
      actions.fetchProfiles.completed(store.collection);
      store.trigger(store.collection);
    });
  }
});
