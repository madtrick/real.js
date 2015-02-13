var Backbone = require('backbone-associations');

var NullProfile = Backbone.Model.extend({
  defaults: {
    image: "http://lh3.googleusercontent.com/-6hzHMmFKiVk/AAAAAAAAAAI/AAAAAAAAAAA/8eRmjENzbNU/s192-c/photo.jpg",
    name: "Jonh Doe"
  }
});

module.exports = NullProfile;
