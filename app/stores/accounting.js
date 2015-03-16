var Fluxxor = require('fluxxor');
var _       = require('lodash');
var actions = require('../actions');

var AccountingStore = Fluxxor.createStore({

  initialize: function(options){
    this.collection = options.collection;
    this._state     = AccountingStore.States.IDLE;

    this.bindActions(
      'CREATE_ENTRY', this.handleAction_createEntry,
      'UPDATE_ENTRY', this.handleAction_updateEntry
    );
  },

  entries: function(){
    return this.collection;
  },

  entry: function(id) {
    return this.collection.get(id);
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
    var model = new this.collection.model({amount: payload.amount, tag_list: payload.tag_list, date: payload.date});
    model.save([], {
      success: _.bind(this.handleSuccessfulModelSave, this),
      error: _.bind(this.handleFailedModelSave, this)
    });

    return 1234;
  },

  handleAction_updateEntry: function(payload) {
    var model = this.entry(payload.entry_id);
    model.save({amount: payload.amount, tag_list: payload.tags, date: payload.date}, {
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
    actions.addError("Couldn't fetch entries. Try again");
    this.emit("change");
  },

  handleSuccessfulModelSave: function(model){
    this.loadEntries();
  },

  handleFailedModelSave: function(model){
    actions.addError("Couldn't save the entry. Try again");

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
