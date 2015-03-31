var BackboneAssociations = require('backbone-associations');
var BackboneSuperSync    = require('backbone-super-sync');
var _                    = require('lodash');
var Auth                 = require('../utils/auth');

require("../vendor/backbone-mutators");

function sync(method, model, options){
    var options = options || {};

    options.headers                  = options.headers || {};
    options.headers['Authorization'] = 'Token token=' + Auth.token();

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
        _.result(options, 'error');
      });
    };

    return BackboneSuperSync.call(this, method, model, options);
}

BackboneAssociations.sync = sync;

var originalCollectionFetch = BackboneAssociations.Collection.prototype.fetch;
BackboneAssociations.Collection.prototype.fetch = function (options) {
  var self        = this;
  this.isFetching = true;

  //TODO. creo que esto ya no hace falta
  try {
    return originalCollectionFetch.call(this, options)
    .then( function () {
      return self.isFetching = false;
    });
  } catch (e) {
    this.isFetching = false;
    throw e;
  }
};
