var Backbone = require('backbone-associations');
var moment   = require("moment");
var User     = require('./user');

var AccountingEntry = Backbone.AssociatedModel.extend({
  url: 'http://localhost:3000/accounting_entries',
  //url: 'http://192.168.1.134:3000/accounting_entries'
  relations: [
    {
      type: Backbone.Associations.One,
      key: 'user',
      relatedModel: User
    }
  ],

  mutators : {
    created_at: function() {
      return moment(this.attributes['created_at']).toDate();
    }
  }
});
module.exports = AccountingEntry;
