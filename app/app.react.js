/** @jsx React.DOM */

require('./ext/backbone');

var React             = require('react');
var Fluxxor           = require('fluxxor');
var AccountingStore   = require('./stores/accounting');
var ProfilesStore     = require('./stores/profiles');
var AccountingEntries = require('./collections/accounting_entries');
var Profiles          = require('./collections/profiles');
var Real              = require('./components/real.react');
var Auth              = require('./utils/auth');
var Gapi              = require('./adapters/gapi');

Auth.start( function(){
  Gapi.load().then(Gapi.init).then(
    function(){
      var stores = {
        AccountingStore: new AccountingStore({collection: new AccountingEntries()}),
        ProfilesStore : new ProfilesStore({collection: new Profiles()})
      };
      var actions = {
        createEntry : function(payload){
          this.dispatch('CREATE_ENTRY', payload);
        },
        fetchProfiles: function(payload){
          this.dispatch('FETCH_PROFILES', payload);
        }
      };

      var flux = new Fluxxor.Flux(stores, actions);

      React.renderComponent(<Real flux={flux}/>, document.getElementById('real-container'));
    },
    function(){
      alert("Gapi initialization failed");
    }
  )
});
