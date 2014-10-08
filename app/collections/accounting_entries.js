var Backbone        = require('backbone-associations');
var AccountingEntry = require('../models/accounting-entry');
var config          = require("../../config");

var AccountingEntries = Backbone.Collection.extend({
  url: config.backendUrl + '/accounting_entries',
  model: AccountingEntry
});
module.exports = AccountingEntries;
