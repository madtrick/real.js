'use strict';

var Reflux            = require('reflux');
var actions           = require('../actions');
var AccountingEntries = require('../collections/accounting_entries');

require('./users'); //require it just to include it on the bundle

module.exports = Reflux.createStore({
  init: function () {
    this.collection = new AccountingEntries();
    this.listenTo(actions.fetchAccountingEntries, this.handleActionFetchEntries);
    this.listenTo(actions.fetchAccountingEntry, this.handleActionFetchEntry);
    this.listenTo(actions.createAccountingEntry, this.handleActionCreateEntry);
    this.listenTo(actions.updateAccountingEntry, this.handleActionUpdateEntry);
  },

  handleActionCreateEntry: function (payload) {
    var self  = this;
    var model = this.collection.add({
      amount: payload.amount,
      tags: payload.tags,
      date: payload.date
    });

    model.save([], {})
    .then( function () {
      self.collection.add(model);
      self.trigger(self.collection);
    })
    .catch( function() {
      actions.addError('Couldn\'t save the entry. Try again');
    });
  },

  handleActionFetchEntry: function(payload) {
   var self = this;
    this.collection.fetch({})
    .then( function () {
      var entry = self.collection.get(payload.id);

      if (entry) {
        self.trigger(entry);
      } else {
        actions.addError('asdasd');
      }
    })
    .catch( function () {
      actions.addError('asdas');
    });
  },

  handleActionFetchEntries: function () {
    var self = this;

    this.collection.fetch({})
    .then(function (){
      actions.fetchUsers()
      .then( function () {
        self.trigger(self.collection);
      });
    })
    .catch(function () {
      actions.addError('Couldn\'t fetch entries. Try again');
    });
  },

  handleActionUpdateEntry: function(payload) {
    var model = this.collection.get(payload.entry_id);
    model.save({amount: payload.amount, tags: payload.tags, date: payload.date})
    .catch( function () {
      actions.addError('Couldn\'t save the entry. Try again');
    });
  }
});
