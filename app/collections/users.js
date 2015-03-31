var Backbone = require('backbone-associations');
var User     = require('../models/user');
var config   = require('../../config');

var Users = Backbone.Collection.extend({
  url   : config.backendUrl + '/users',
  model : User
});

module.exports = Users;

