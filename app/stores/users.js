'use strict';
var Reflux  = require('reflux');
var _       = require('lodash');
var actions = require('../actions');
var Users   = require('../collections/users');

require('./profiles'); //require to include it in the bundle

module.exports = Reflux.createStore({
  init: function () {
    this.collection = new Users();
    this.listenTo(actions.fetchUsers, this.handleActionFetchUsers);
  },

  users: function () {
    return this.collection;
  },


  handleActionFetchUsers: function () {
    var self = this;

    this.collection.fetch({})
    .then(function (){
      self._fetchProfiles()
      .then( function () {
        actions.fetchUsers.completed(self.collection);
        self.trigger(self.collection);
      });
    })
    .catch(function () {
      actions.addError('Couldn\'t fetch Users. Try again!');
    });
  },

  _fetchProfiles: function() {
    var ids =
      _.uniq(
      _.invoke(this.collection.models,
        'get', 'google_id')
      );

    return actions.fetchProfiles({ids: ids});
  },

  _profilesForUsers: function (profiles) {
    var self = this;
    profiles.each( function (profile) {
      self._profileForUser(profile);
    });
  },

  _profileForUser: function (profile) {
    /*eslint camelcase: [2, {properties: "never"}]*/
    var user = this.collection.findWhere({google_id: profile.id});
    user.set('profile', profile);
  }
});

