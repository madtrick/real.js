'use strict';

var redefine = require('redefine');
var _        = require('lodash');
var moment   = require('moment');

module.exports = redefine.Class({
  everyDay: function(from, to, what) {
    var dateFrom     = moment([from.getFullYear(), from.getMonth(), from.getDate()]);
    var dateTo       = moment([to.getFullYear(), to.getMonth(), to.getDate()]);
    var numberOfDays = dateTo.diff(dateFrom, 'days');

    return _.times(numberOfDays, function(n){
      // Have to create a new date on each round or dateFrom
      // will accumulate all aditions
      return {date: moment(dateFrom).add(n + 1, 'days').toDate(), value: what};
    });
  }
});
