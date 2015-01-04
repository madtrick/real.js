var moment          = require('moment');
var Backbone        = require('backbone-associations');
var Cocktail        = require('backbone.cocktail');
var _               = require('lodash');
var Stats           = require('./mixins/accounting-entries/stats.js');
var AccountingEntry = require('../models/accounting-entry');
var config          = require('../../config');

var AccountingEntries = Backbone.Collection.extend({
  url    : config.backendUrl + '/accounting_entries',
  model  : AccountingEntry,

  initialize: function() {
    Cocktail.mixin(this, Stats);
  },

  chain: function(callback){
    var result;

    this._initChaining();
    result = callback(this);
    this._clearChaining();

    return result;
  },

  findByDateRange: function(startDate, endDate){
    var moment__startDate = moment(startDate);
    var moment__endDate   = moment(endDate);

    return this.filter(function(accountingEntry){
      created_at = accountingEntry.get('created_at');

      return moment__startDate.isBefore(created_at) && moment__endDate.isAfter(created_at);
    });
  },

  findByMonth: function(month) {
    return this.filter(function(accountingEntry){
      return accountingEntry.get('created_at').getMonth() == month;
    });
  },

  findByTags: function(tags) {
    return this.filter(function(accountingEntry){
      return _.any(accountingEntry.get('tags'), function(tag){
        return tags.indexOf(tag) != -1;
      });
    });
  },

  _initChaining: function(){
    var chainables         = ['findByMonth', 'findByTags'];
    var self               = this;
    this._unchainedMethods = {};
    this._originalModels   = self.models;

    _.each(chainables, function(chainable){
      self._unchainedMethods[chainable] = self[chainable];

      self[chainable] = function(){
        var result =  self._unchainedMethods[chainable].apply(self, Array.prototype.slice.call(arguments));
        self.models = result;

        return self;
      };
    });
  },

  _clearChaining: function() {
    var chainables = ['findByMonth', 'findByTags'];
    _.each(chainables, function(chainable){
      this[chainable] = this._unchainedMethods[chainable];
    }, this);

    this.models = this._originalModels;
  }
});
module.exports = AccountingEntries;
