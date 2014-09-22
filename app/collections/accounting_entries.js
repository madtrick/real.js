var Collection      = require('./_collection');
var AccountingEntry = require('../models/accounting-entry');

var AccountingEntries = Collection.extend({
  url: 'http://192.168.1.134:3000/accounting_entries',
  model: AccountingEntry,

  sync: function(method, collection, options){
    var options = options || {};

    options.withCredentials                        = false;
    options.headers                                = options.headers || {};
    options.headers['Access-Control-Allow-Origin'] = '*';

    return Collection.prototype.sync.call(this, method, collection, options);
  }
});
module.exports = AccountingEntries;
