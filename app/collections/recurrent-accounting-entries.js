'use strict';

var Backbone                 = require('backbone-associations');
var RecurrentAccountingEntry = require('../models/recurrent-accounting-entry');
var config                   = require('../../config');

module.exports = Backbone.Collection.extend({
  url: config.backendUrl + '/recurrent_accounting_entries',
  model: RecurrentAccountingEntry
});
