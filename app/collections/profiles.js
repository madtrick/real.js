var Backbone    = require('backbone-associations');
var Profile     = require('../models/profile');
var NullProfile = require('../models/null-profile');

var Profiles = Backbone.Collection.extend({
  model: Profile,
});

module.exports = Profiles;
