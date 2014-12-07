var redefine = require('redefine');
var _        = require('lodash');

var Transformations = redefine.Class({
  accumulatedPerDay: function(data){
    var acc = 0;
    return _.each(data, function(obj){
      acc = obj.value + acc;
      obj.value = acc;
    });
  }
});

module.exports = Transformations;
