var Fluxxor = require('fluxxor');
var _       = require('lodash');

var AccountingStore = Fluxxor.createStore({

  initialize: function(options){
    this.collection = options.collection;
    this._loadCollection();

    this.bindActions(
      'CREATE_ENTRY', this.handleAction_createEntry
    );
  },

  entries: function(){
    return this.collection.models;
  },

  handleAction_createEntry: function(payload){
    var model = this.collection.add({amount: payload.amount, tag_list: payload.tag_list});
    model.save([], {
      success: _.bind(this.handleSuccessfulModelSave, this),
      error: _.bind(this.handleFailedModelSave, this)
    });
  },

  handleSuccessfulCollectionFetch: function(){
    var ids =
      _.uniq(
      _.invoke(
      _.invoke(this.collection.models,
        'get', 'user'),
        'get', 'google_id'));

    this.flux.actions.fetchProfiles({ids: ids});
    this.emit("change");
  },

  handleSuccessfulModelSave: function(model){
    this._loadCollection();
  },

  handleFailedModelSave: function(model){
    this.collection.remove(model);
  },

  _loadCollection: function(){
    this.collection.fetch({success: _.bind(this.handleSuccessfulCollectionFetch, this)});
  }

});

module.exports = AccountingStore;
