'use strict';

var _               = require('lodash');
var Transformations = require('../../classes/graphs-data/transformations');

module.exports = {
  data: function(entries) {
    var result, lastyDayInMonth;
    var date = new Date();

    result = _.times(date.getMonth() + 1, function(month){
      if (month === date.getMonth()){
        lastyDayInMonth = date.getDate();
      } else {
        lastyDayInMonth = new Date(date.getYear(), month + 1, 0).getDate();
      }

      return {
        date: new Date(date.getFullYear(), month, lastyDayInMonth),
        value: Math.abs(entries.expenseByMonth(month))
      };
    });

    return new Transformations().accumulate(result);
  }
};
