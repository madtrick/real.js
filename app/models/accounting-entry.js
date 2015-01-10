var Backbone = require('backbone-associations');
var moment   = require("moment");
var User     = require('./user');
var config   = require("../../config");

var AccountingEntry = Backbone.AssociatedModel.extend({
  urlRoot: config.backendUrl + '/accounting_entries',

  relations: [
    {
      type: Backbone.Associations.One,
      key: 'user',
      relatedModel: User
    }
  ],

  mutators : {
    date: function() {
      return moment(this.attributes.date).toDate();
    }
  }
});
module.exports = AccountingEntry;
