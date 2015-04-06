'use strict';

var _               = require('lodash');
var Adapters        = require('../../classes/graphs-data/adapters');
var Transformations = require('../../classes/graphs-data/transformations');

var MonthlyAccTagsData = {
  data: function(entries, month, tags) {
    var result       = [];
    var currentMonth = month;

    _.each(tags, function(element){
      entries.chain(function(collection){
        result.push(collection.findByMonth(currentMonth).findByTags([element]).models);
      });
    });

    result = _.chain(result)
      .map(function(subArray){
        return Adapters.adaptBackboneModels(subArray);
      })
      .map(function(subArray){
        return new Transformations().absolutize(subArray);
      })
      .map(function(subArray){
        return new Transformations().midnightizeDates(subArray);
      })
      .value();

    var macc;
    var transformation = new Transformations();

    macc = transformation.multiAccumulate.apply(transformation, result);


    result = _.map(result, function(subArray){
        return new Transformations().accumulate(subArray);
      });

    result =  transformation.equalizeEndings.apply(transformation, result);
    result.push(macc);

    return result;
  }
};

module.exports = MonthlyAccTagsData;
