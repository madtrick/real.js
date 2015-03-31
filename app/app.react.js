/** @jsx React.DOM */

require('./ext/backbone');

var React                           = require('react');
var RRouter                         = require('rrouter');
var RecurrentAccountingEntriesStore = require('./stores/recurrent-accounting-entries');
var ProfilesStore                   = require('./stores/profiles');
var AccountingEntries               = require('./collections/accounting_entries');
var RecurrentAccountingEntries      = require('./collections/recurrent-accounting-entries');
var Profiles                        = require('./collections/profiles');
var Real                            = require('./components/real.react');
var AccountingEntryEdit             = require('./components/accounting-entry-edit.react');
var AccountingEntriesList           = require('./components/accounting-entries-list.react');
var RecurrentAccountingEntries      = require('./components/recurrent-accounting-entries.react');
var RecurrentAccountingEntryNew     = require('./components/recurrent-accounting-entry-new.react');
var Graphs                          = require('./components/graphs.react');
var Auth                            = require('./utils/auth');
var Gapi                            = require('./adapters/gapi');

var Routes = RRouter.Routes;
var Route  = RRouter.Route;

var config = require("../config");

Auth.start(config.googleClientId, config.googleRedirectUri, function(){
  Gapi.load()
    .then(Gapi.init)
    .then(
      function(){
        var routes = (
          <Routes>
            <Route name="main" path="/" view={Real}/>
            <Route name="graphs" path="/graphs" view={Graphs}/>
            <Route name="edit" path="/edit/:accountingEntryId" view={AccountingEntryEdit}/>
            <Route name="accounting-entries-list" path="/accounting-entries-list" view={AccountingEntriesList}/>
            <Route name="recurrent-accounting-entries" path="/recurrent-accounting-entries" view={RecurrentAccountingEntries}/>
            <Route name="recurrent-accounting-entry-new" path="/recurrent-accounting-entries/new" view={RecurrentAccountingEntryNew}/>
          </Routes>
        );

        try {
          RRouter.HashRouting.start(routes, function(view) {
            React.renderComponent(view, document.getElementById('real-container'));
          });
        } catch (e) {
          // If I don't log the error here then 
          // the promise library used by the Hello.js library
          // will catch it and only reject the promise. This
          // will silence all kinds of errors making development
          // a pain in the ass.
          //
          // Capturing the error here and printing the error
          // message is something.
          console.error(e.stack);
        }

    })
    .catch(function(error){
      // Same as above
      console.error(error.stack);
    })
});
