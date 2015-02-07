var Backbone                 = require('backbone-collection');
var RecurrentAccountingEntry = require('../models/recurrent-accounting-entry');

var RecurrentAccountingEntries = Backbone.Collection.extend({
  model : RecurrentAccountingEntry
});
module.exports = RecurrentAccountingEntries;
