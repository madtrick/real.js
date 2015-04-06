'use strict';

var Backbone = require('backbone-associations');
var User     = require('../models/user');
var config   = require('../../config');

module.exports = Backbone.Collection.extend({
  url: config.backendUrl + '/users',
  model: User
});
