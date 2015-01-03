var moment   = require('moment');
var redefine = require('redefine');
var _        = require('lodash');

var Transformations = redefine.Class({
  accumulate: function(data){
    var acc = 0;
    return _.map(data, function(obj){
      acc = obj.value + acc;
      return _.extend({}, obj, {value: acc});
    });
  },

  absolutize: function(data){
    return _.map(data, function(obj){
      return _.extend({}, obj, {value: Math.abs(obj.value)});
    });
  },

  midnightizeDates: function(data){
    return _.map(data, function(obj){
      return _.extend({}, obj, {date: moment(obj.date).startOf('day').toDate()});
    });
  },

  equalizeEndings: function(){
    var arrays = Array.prototype.slice.call(arguments);
    var latestDate, date, arraysNeedingPadding = [];

    padding = _.reduce(arrays, function(acc, array){
      if (array.length === 0) return acc;

      date = array[array.length - 1].date;

      if(!acc.date)
        return {date: date, array: array};
      else {
        if (moment(acc).isAfter(date)) {
          arraysNeedingPadding.push(array);
          return acc;
        } else if (moment(acc).isBefore(date)){
          arraysNeedingPadding.push(acc.array);
          return {date: date, array: array};
        }
      }
    }, {date: undefined, array: undefined});

    return _.map(arrays, function(array){
      if (arraysNeedingPadding.indexOf(array) != -1)
        array.push({date: padding.date, value: array[array.length - 1].value});

      return array;
    });
  },
  multiAccumulate: function(){
    var arrays = Array.prototype.slice.call(arguments);
    var array;

    array = _.reduce(arrays, function(acc, subArray){
      return acc.concat(subArray);
    }, []);

    array = _.sortBy(array, function(element){
      return element.date;
    });

    return this.accumulate(array);
  }
});

module.exports = Transformations;
