'use strict';

var Reflux  = require('reflux');
var actions = require('../actions');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(actions.addError, this.handleActionAddError);
  },

  getInitialState: function () {
    return [];
  },

  handleActionAddError: function (payload) {
    this.trigger({message: payload});
  }
})
