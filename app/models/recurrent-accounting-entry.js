'use strict';

var Backbone = require('backbone-associations');
var moment   = require('moment');
var config   = require('../../config');

function MonthlyRecurrentExpression(expression) {
  this.expression      = expression;
  this.firstDayOfMonth = moment().date(this.expression);
}

MonthlyRecurrentExpression.prototype.activates = function(last) {
  var momentLast = moment(last);
  var momentNow  = moment();

  if ( !last ) {
    return true;
  }

  return  this.firstDayOfMonth.isBefore(momentNow) &&
          momentLast.isBefore(this.firstDayOfMonth);
};

module.exports = Backbone.Model.extend({
  urlRoot: config.backendUrl + '/recurrent_accounting_entries',

  isOverdue: function () {
    return new MonthlyRecurrentExpression(this.get('period')).activates(this.get('last_run'));
  }
});
