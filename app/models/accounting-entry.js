var Model = require('./_model');

var AccountingEntry = Model.extend({
  url: 'http://localhost:3000/accounting_entries',
  //url: 'http://192.168.1.134:3000/accounting_entries'
});
module.exports = AccountingEntry;
