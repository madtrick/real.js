var Fluxxor = require('fluxxor');
var _       = require('lodash');
var Errors  = require("../services/errors");

var RecurrentAccountingEntriesStore = Fluxxor.createStore({

  initialize: function(options){
    this.collection = options.collection;
    this._state     = RecurrentAccountingEntriesStore.States.IDLE;

    this.bindActions(
      'CREATE_RECURRENT_ENTRY', this.handleAction_createRecurrentEntry
    );
  },

  entries: function(){
    return this.collection;
  },

  entry: function(id) {
    return this.collection.get(id);
  },

  loadEntries: function() {
    this._state = RecurrentAccountingEntriesStore.States.LOADING_ENTRIES;
    this.collection.fetch({
      success: _.bind(this.handleSuccessfulCollectionFetch, this),
      error: _.bind(this.handleFailedCollectionFetch, this)
    });
    this.emit('change');
  },

  state: function() {
    return this._state;
  },

  handleAction_createRecurrentEntry: function(payload){
    var model = new this.collection.model({amount: payload.amount, tag_list: payload.tag_list});
    model.save([], {
      success: _.bind(this.handleSuccessfulModelSave, this),
      error: _.bind(this.handleFailedModelSave, this)
    });
  },

  handleSuccessfulCollectionFetch: function(){
    this._state = RecurrentAccountingEntriesStore.States.IDLE;
    this.emit("change");
  },

  handleFailedCollectionFetch: function() {
    this._state = RecurrentAccountingEntriesStore.States.IDLE;
    Errors.add("Couldn't fetch recurrent entries. Try again");
    this.emit("change");
  },

  handleSuccessfulModelSave: function(model){
    this.loadEntries();
  },

  handleFailedModelSave: function(model){
    Errors.add("Couldn't save the recurrent entry. Try again");

    this.emit("change");
  }

});

RecurrentAccountingEntriesStore.States = {
  IDLE            : 'idle',
  LOADING_ENTRIES : 'loading_entries'
};

module.exports = RecurrentAccountingEntriesStore;
