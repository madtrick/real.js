'use strict';

var Reflux                     = require('reflux');
var _                          = require('lodash');
var RecurrentAccountingEntries = require('../collections/recurrent-accounting-entries');
var actions                    = require('../actions');

module.exports = Reflux.createStore({
  init: function () {
    this.collection = new RecurrentAccountingEntries();
    this.listenTo(actions.createRecurrentAccountingEntry,
                  this.handleActionCreateRecurrentAccountingEntry);
    this.listenTo(actions.updateRecurrentAccountingEntry,
                  this.handleActionUpdateRecurrentAccountingEntry);

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

  handleActionCreateRecurrentAccountingEntry: function(payload){
    var model = this.collection.add(
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

  handleActionUpdateRecurrentAccountingEntry: function (payload) {
    var model = this.collection.get(payload.entry_id);
    /*eslint camelcase: [2, {properties: "never"}]*/
    model.save(
      {
        last_run: payload.last_run,
        period: payload.period,
        amount: payload.amount,
        tags: payload.tags
      },
      {
        success: _.bind(this.handleSuccessfulModelSave, this),
        error: _.bind(this.handleFailedModelSave, this)
      }
    );
  },

  handleSuccessfulCollectionFetch: function(){
    this.trigger(this.collection);
  },

  handleFailedCollectionFetch: function() {
    actions.addError('Couldn\'t fetch recurrent entries. Try again');
  },

  handleSuccessfulModelSave: function(){
    this.loadEntries();
  },

  handleFailedModelSave: function(){
    actions.addError('Couldn\'t save recurrent entry. Try again');
  }
});
