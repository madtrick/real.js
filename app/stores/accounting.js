var Fluxxor = require('fluxxor');
var _       = require('lodash');

var AccountingStore = Fluxxor.createStore({

  initialize: function(options){
    this.collection = options.collection;
    this.collection.fetch({success: _.bind(this.handleSuccessfulCollectionFetch, this)});

    this.bindActions(
      'CREATE_ENTRY', this.handleAction_createEntry
    );
  },

  entries: function(){
    return this.collection.models;
  },

  handleAction_createEntry: function(payload){
    var model = this.collection.add({amount: payload.amount});
    model.save({
      success: _.bind(this.handleSuccessfulModelSave, this),
      error: _.bind(this.handleFailedModelSave, this)
    });
  },

  handleSuccessfulCollectionFetch: function(){
    this.emit("change");
  },

  handleSuccessfulModelSave: function(model){
    this.emit("change");
  },

  handleFailedModelSave: function(model){
    this.collection.remove(model);
  }

});

module.exports = AccountingStore;
