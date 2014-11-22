var moment          = require('moment');
var Backbone        = require('backbone-associations');
var Cocktail        = require('backbone.cocktail');
var Stats           = require('./mixins/accounting-entries/stats.js');
var AccountingEntry = require('../models/accounting-entry');
var config          = require('../../config');

var AccountingEntries = Backbone.Collection.extend({
  url    : config.backendUrl + '/accounting_entries',
  model  : AccountingEntry,

  initialize: function() {
    Cocktail.mixin(this, Stats);
  },

  findByMonth: function(month) {
    return this.filter(function(accountingEntry){
      return accountingEntry.get('created_at').getMonth() == month;
    });
  }
});
module.exports = AccountingEntries;
