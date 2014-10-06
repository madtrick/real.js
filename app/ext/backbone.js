var Backbone          = require('backbone-associations');
var BackboneSuperSync = require('backbone-super-sync');
var _                 = require('lodash');
var Auth              = require('../utils/auth');

require("../vendor/backbone-mutators");

function sync(method, model, options){
    var options = options || {};

    options.headers                  = options.headers || {};
    options.headers['Authorization'] = 'Token token=' + Auth.token();

    return BackboneSuperSync.call(this, method, model, options);
}

Backbone.sync = sync;
