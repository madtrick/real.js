var Reflux                     = require('reflux');
var _                          = require('lodash');
var RecurrentAccountingEntries = require('../collections/recurrent-accounting-entries');
var Errors                     = require("../services/errors");
var actions                    = require("../actions");

module.exports = Reflux.createStore({
  init: function () {
    this.collection = new RecurrentAccountingEntries();
    this.listenTo(actions.createRecurrentEntry, this.handleAction_createRecurrentEntry);

    this.loadEntries();
  },

  getInitialState: function () {
    return this.collection;
  },

  loadEntries: function() {
    this.collection.fetch({
      success: _.bind(this.handleSuccessfulCollectionFetch, this),
      error: _.bind(this.handleFailedCollectionFetch, this)
    });
  },

  handleAction_createRecurrentEntry: function(payload){
    var model = new this.collection.model({amount: payload.amount, tag_list: payload.tag_list});
    model.save([], {
      success: _.bind(this.handleSuccessfulModelSave, this),
      error: _.bind(this.handleFailedModelSave, this)
    });
  },

  handleSuccessfulCollectionFetch: function(){
    this.trigger(this.collection);
  },

  handleFailedCollectionFetch: function() {
    Errors.add("Couldn't fetch recurrent entries. Try again");
  },

  handleSuccessfulModelSave: function(model){
    this.loadEntries();
  },

  handleFailedModelSave: function(model){
    Errors.add("Couldn't save recurrent entry. Try again");
  }
});
