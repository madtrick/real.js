var Reflux                     = require('reflux');
var _                          = require('lodash');
var actions                    = require("../actions");

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(actions.addError, this.handleAction_addError);
  },

  getInitialState: function () {
    return [];
  },

  handleAction_addError: function (payload) {
    this.trigger({message: payload});
  }
})
