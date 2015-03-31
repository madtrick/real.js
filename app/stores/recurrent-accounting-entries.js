var Reflux                     = require('reflux');
var _                          = require('lodash');
var RecurrentAccountingEntries = require('../collections/recurrent-accounting-entries');
var actions                    = require("../actions");

module.exports = Reflux.createStore({
  init: function () {
    this.collection = new RecurrentAccountingEntries();
    this.listenTo(actions.createRecurrentAccountingEntry, this.handleAction_createRecurrentAccountingEntry);
    this.listenTo(actions.updateRecurrentAccountingEntry, this.handleAction_updateRecurrentAccountingEntry);

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

  handleAction_createRecurrentAccountingEntry: function(payload){
    var model = new this.collection.model(
      {
        period: payload.period,
        amount: payload.amount,
        tags: payload.tags
      });

    model.save([], {
      success: _.bind(this.handleSuccessfulModelSave, this),
      error: _.bind(this.handleFailedModelSave, this)
    });
  },

  handleAction_updateRecurrentAccountingEntry: function (payload) {
    var model = this.collection.get(payload.entry_id);
    model.save(
      {
        last_run : payload.last_run,
        period   : payload.period,
        amount   : payload.amount,
        tags     : payload.tags
      },
      {
        success : _.bind(this.handleSuccessfulModelSave, this),
        error   : _.bind(this.handleFailedModelSave, this)
      }
    );
  },

  handleSuccessfulCollectionFetch: function(){
    this.trigger(this.collection);
  },

  handleFailedCollectionFetch: function() {
    actions.addError("Couldn't fetch recurrent entries. Try again");
  },

  handleSuccessfulModelSave: function(model){
    this.loadEntries();
  },

  handleFailedModelSave: function(model){
    actions.addError("Couldn't save recurrent entry. Try again");
  }
});
