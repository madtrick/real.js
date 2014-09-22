var BackboneModel = require('backbone-model').Model;
var AmpersandSync = require('ampersand-sync');

BackboneModel.prototype.sync = function(){ return AmpersandSync.apply(this, arguments); };
module.exports = BackboneModel;
