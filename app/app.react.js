/** @jsx React.DOM */
'use strict';

require('./ext/backbone');

var Router = require('./router.react');
var Auth   = require('./utils/auth');
var Gapi   = require('./adapters/gapi');

var config = require('../config');

Auth.start(config.googleClientId, config.googleRedirectUri, function(){
  Gapi.load()
    .then(Gapi.init)
    .then(
      function(){
        //var routes = (
        //  <Routes>
        //    <Route
        //      name="main"
        //      path="/"
        //      view={Real}
        //    />
        //    <Route
        //      name="graphs"
        //      path="/graphs"
        //      view={Graphs}
        //    />
        //    <Route
        //      name="edit"
        //      path="/edit/:accountingEntryId"
        //      view={AccountingEntryEdit}
        //    />
        //    <Route
        //      name="accounting-entries-list"
        //      path="/accounting-entries-list"
        //      view={AccountingEntriesList}
        //    />
        //    <Route
        //      name="recurrent-accounting-entries"
        //      path="/recurrent-accounting-entries"
        //      view={RecurrentAccountingEntries}
        //    />
        //    <Route
        //      name="recurrent-accounting-entry-new"
        //      path="/recurrent-accounting-entries/new"
        //      view={RecurrentAccountingEntryNew}
        //    />
        //  </Routes>
        //);

        try {
          Router.run();
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
