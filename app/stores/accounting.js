var Fluxxor = require('fluxxor');
var _       = require('lodash');
var Errors  = require("../services/errors");

var AccountingStore = Fluxxor.createStore({

  initialize: function(options){
    this.collection = options.collection;
    this._state     = AccountingStore.States.IDLE;

    this.bindActions(
      'CREATE_ENTRY', this.handleAction_createEntry
    );
  },

  entries: function(){
    return this.collection.models;
  },

  loadEntries: function() {
    this._state = AccountingStore.States.LOADING_ENTRIES;
    this.collection.fetch({
      success: _.bind(this.handleSuccessfulCollectionFetch, this),
      error: _.bind(this.handleFailedCollectionFetch, this)
    });
    this.emit('change');
  },

  state: function() {
    return this._state;
  },

  handleAction_createEntry: function(payload){
    var model = new this.collection.model({amount: payload.amount, tag_list: payload.tag_list});
    model.save([], {
      success: _.bind(this.handleSuccessfulModelSave, this),
      error: _.bind(this.handleFailedModelSave, this)
    });
  },

  handleSuccessfulCollectionFetch: function(){
    this._state = AccountingStore.States.IDLE;
    this.fetchProfiles();
    this.emit("change");
  },

  handleFailedCollectionFetch: function() {
    this._state = AccountingStore.States.IDLE;
    Errors.add("Couldn't fetch entries. Try again");
    this.emit("change");
  },

  handleSuccessfulModelSave: function(model){
    this.loadEntries();
  },

  handleFailedModelSave: function(model){
    Errors.add("Couldn't save the entry. Try again");

    this.emit("change");
  },

  fetchProfiles: function() {
    var ids =
      _.uniq(
      _.invoke(
      _.invoke(this.collection.models,
        'get', 'user'),
        'get', 'google_id'));

    this.flux.actions.fetchProfiles({ids: ids});
  },

});

AccountingStore.States = {
  IDLE            : 'idle',
  LOADING_ENTRIES : 'loading_entries'
};

module.exports = AccountingStore;
