var redefine = require("redefine");

var Errors = redefine.Class({
  statics: {
    size: function() {
      return this.collection.length;
    },

    add: function(payload) {
      this.collection.push(payload);
    },

    reset: function() {
      var errors      = this.collection;
      this.collection = [];

      return errors;
    }
  }
});

Errors.collection = [];

module.exports = Errors;
