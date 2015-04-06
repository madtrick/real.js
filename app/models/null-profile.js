'use strict';

var Backbone = require('backbone-associations');

module.exports = Backbone.Model.extend({
  defaults: {
    /* eslint-disable */
    image: 'http://lh3.googleusercontent.com/-6hzHMmFKiVk/AAAAAAAAAAI/AAAAAAAAAAA/8eRmjENzbNU/s192-c/photo.jpg',
    /* eslint-enable */
    name: 'Jonh Doe'
  }
});
