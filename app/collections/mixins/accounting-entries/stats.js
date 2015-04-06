'use strict';

var _ = require('lodash');

module.exports = {
  currentMonthAccumulatedExpense: function() {
    return this.expenseByMonth((new Date()).getMonth());
  },

  expenseByMonth: function(month){
    var entriesInMonth = this.findByMonth(month);
    var expenses       = _.filter(entriesInMonth, function(entry){
      return entry.get('amount') < 0;
    });

    return _.reduce(expenses, function(acc, accountingEntry){
      return acc + accountingEntry.get('amount');
    }, 0);
  }
};
