'use strict';

var Backbone    = require('backbone-associations');
var Profile     = require('../models/profile');

module.exports = Backbone.Collection.extend({
  model: Profile
});
