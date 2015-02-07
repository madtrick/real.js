var Backbone = require('backbone-model');
var moment   = require('moment');

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
  isOverdue : function () {
    return new MonthlyRecurrentExpression(1).activates(this.get('last-run'));
  }
});
module.exports = RecurrentAccountingEntry;
