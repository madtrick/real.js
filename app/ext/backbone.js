'use strict';

var BackboneAssociations = require('backbone-associations');
var BackboneSuperSync    = require('backbone-super-sync');
var _                    = require('lodash');
var Auth                 = require('../utils/auth');

require('../vendor/backbone-mutators');

function sync(method, model, options){
    var extendedOptions = options || {};

    extendedOptions.headers               = extendedOptions.headers || {};
    extendedOptions.headers.Authorization = 'Token token=' + Auth.token();

    /*
     * Hackish way to handle error on the connection.
     *
     * BackboneSuperSync uses superagent to do the actual http request.
     * This library doesn't handle errors on the underlying connection
     * (using the XMLHTTPRequest property 'onerror')
     *
     * This is the only way I have found to be notified of this kind of
     * errors.
     */
    BackboneSuperSync.editRequest = function (request) {
      request.on('error', function(){
        _.result(extendedOptions, 'error');
      });
    };

    return BackboneSuperSync.call(this, method, model, extendedOptions);
}

BackboneAssociations.sync = sync;
