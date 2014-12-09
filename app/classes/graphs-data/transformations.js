var redefine = require('redefine');
var _        = require('lodash');

var Transformations = redefine.Class({
  accumulatedPerDay: function(data){
    var acc = 0;
    return _.map(data, function(obj){
      acc = obj.value + acc;
      return _.extend({}, obj, {value: acc});
    });
  }
});

module.exports = Transformations;
