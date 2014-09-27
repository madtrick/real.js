var Model             = require('backbone-model').Model;
var Collection        = require('backbone-collection').Collection;
var BackboneSuperSync = require('backbone-super-sync');
var _                 = require('lodash');
var Auth              = require('../utils/auth');

function sync(method, model, options){
    var options = options || {};

    options.headers                                = options.headers || {};
    options.headers['Authorization'] = 'Token token=' + Auth.token();

    return BackboneSuperSync.call(this, method, model, options);
}

Model.prototype.sync      = sync;
Collection.prototype.sync = sync;
