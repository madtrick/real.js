/** @jsx React.DOM */

require('./ext/backbone');

var React               = require('react');
var Fluxxor             = require('fluxxor');
var RRouter             = require('rrouter');
var AccountingStore     = require('./stores/accounting');
var ProfilesStore       = require('./stores/profiles');
var AccountingEntries   = require('./collections/accounting_entries');
var Profiles            = require('./collections/profiles');
var Real                = require('./components/real.react');
var AccountingEntryEdit = require('./components/accounting-entry-edit.react');
var Graphs              = require('./components/graphs.react');
var Auth                = require('./utils/auth');
var Gapi                = require('./adapters/gapi');

var Routes = RRouter.Routes;
var Route  = RRouter.Route;

var config = require("../config");

Auth.start(config.googleClientId, config.googleRedirectUri, function(){
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
        updateEntry : function(payload){
          this.dispatch('UPDATE_ENTRY', payload);
        },
        fetchProfiles: function(payload){
          this.dispatch('FETCH_PROFILES', payload);
        }
      };

      stores.AccountingStore.loadEntries();

      var flux = new Fluxxor.Flux(stores, actions);

      var routes = (
        <Routes>
          <Route path="/" view={Real} flux={flux}/>
          <Route path="graphs" path="/graphs" view={Graphs} flux={flux}/>
          <Route name="edit" path="/edit/:accountingEntryId" view={AccountingEntryEdit} flux={flux}/>
        </Routes>
      );

      RRouter.HashRouting.start(routes, function(view) {
        React.renderComponent(view, document.getElementById('real-container'));
      });

    },
    function(){
      alert("Gapi initialization failed");
    }
  )
});
