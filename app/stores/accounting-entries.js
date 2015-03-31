var Reflux            = require('reflux');
var _                 = require('lodash');
var actions           = require('../actions');
var AccountingEntries = require('../collections/accounting_entries');

require('./users'); //require it just to include it on the bundle

module.exports = Reflux.createStore({
  init: function () {
    this.collection = new AccountingEntries();
    this.listenTo(actions.fetchAccountingEntries, this.handleAction_fetchEntries);
    this.listenTo(actions.fetchAccountingEntry, this.handleAction_fetchEntry);
    this.listenTo(actions.createAccountingEntry, this.handleAction_createEntry);
    this.listenTo(actions.updateAccountingEntry, this.handleAction_updateEntry);
  },

  handleAction_createEntry: function (payload) {
    var self  = this;
    var model = new this.collection.model({
      amount : payload.amount,
      tags   : payload.tags,
      date   : payload.date
    });

    model.save([], {})
    .then( function () {
      self.collection.add(model);
      self.trigger(self.collection);
    })
    .catch( function(e) {
      actions.addError("Couldn't save the entry. Try again");
    });
  },

  handleAction_fetchEntry: function(payload) {
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

  handleAction_fetchEntries: function () {
    var self = this;

    this.collection.fetch({})
    .then(function (){
      actions.fetchUsers()
      .then( function (users) {
        self.trigger(self.collection);
      });
    })
    .catch(function (e) {
      actions.addError("Couldn't fetch entries. Try again");
    });
  },

  handleAction_updateEntry: function(payload) {
    var model = this.collection.get(payload.entry_id);
    model.save({amount: payload.amount, tags: payload.tags, date: payload.date})
    .catch( function () {
      actions.addError("Couldn't save the entry. Try again");
    });
  }
});
