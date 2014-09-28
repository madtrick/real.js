//var Model = require('backbone-model').Model;
var Backbone = require('backbone-associations');
var User = require('./user');

var AccountingEntry = Backbone.AssociatedModel.extend({
  url: 'http://localhost:3000/accounting_entries',
  //url: 'http://192.168.1.134:3000/accounting_entries'
  relations: [
    {
      type: Backbone.Associations.One,
      key: 'user',
      relatedModel: User
    }
  ]
});
module.exports = AccountingEntry;
