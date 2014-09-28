//var Collection      = require('backbone-collection').Collection;
var Backbone = require('backbone-associations');
var AccountingEntry = require('../models/accounting-entry');

var AccountingEntries = Backbone.Collection.extend({
  url: 'http://localhost:3000/accounting_entries',
  //url: 'http://192.168.1.134:3000/accounting_entries',
  model: AccountingEntry
});
module.exports = AccountingEntries;
