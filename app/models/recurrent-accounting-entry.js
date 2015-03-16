var Backbone = require('backbone-associations');
var moment    = require('moment');
var config    = require('../../config');

function MonthlyRecurrentExpression(expression) {
  this.expression      = expression;
  this.firstDayOfMonth = moment().date(this.expression);
}

MonthlyRecurrentExpression.prototype.activates = function(last) {
  var momentLast = moment(last);
  var momentNow  = moment();

  if ( last === undefined )
    return true;

  return  this.firstDayOfMonth.isBefore(momentNow) &&
          momentLast.isBefore(this.firstDayOfMonth);
};

var RecurrentAccountingEntry = Backbone.Model.extend({
  urlRoot: config.backendUrl + '/recurrent_accounting_entries',

  isOverdue : function () {
    return new MonthlyRecurrentExpression(this.get('period')).activates(this.get('last-run'));
  }
});
module.exports = RecurrentAccountingEntry;
