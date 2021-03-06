'use strict';

var redefine = require('redefine');
var _        = require('lodash');

var Adapters = redefine.Class({
  statics: {
    adaptBackboneModels: function(models){
      return _.map(models, function(model){
        return {date: model.get('date'), value: model.get('amount')};
      });
    }
  }
});

module.exports = Adapters;
