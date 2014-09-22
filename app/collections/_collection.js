var BackboneCollection = require('backbone-collection').Collection;
var AmpersandSync      = require('ampersand-sync');

BackboneCollection.prototype.sync = function(){ return AmpersandSync.apply(this, arguments); };
module.exports = BackboneCollection;
