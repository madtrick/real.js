var Backbone = require('backbone-associations');
var moment   = require("moment");
var User     = require('./user');
var config   = require("../../config");

var AccountingEntry = Backbone.AssociatedModel.extend({
  url: config.backendUrl + '/accounting_entries',
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
