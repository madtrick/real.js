var Backbone = require('backbone-associations');
var _        = require('lodash');
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
  },

  toJSON: function() {
    /*
     * Date.prototype.toJSON converts date objects without taking
     * the timezone into account substracting one day in some cases
     *
     * See this question in SO for more info:
     *
     * http://stackoverflow.com/questions/11382606/javascript-date-tojson-dont-get-the-timezone-offset
     */

    var attributes  = _.cloneDeep(this.attributes);
    attributes.date = attributes.date; //return the date without the mutator transformation

    return attributes;
  }
});
module.exports = AccountingEntry;
