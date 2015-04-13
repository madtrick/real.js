/** @jsx React.DOM */
'use strict';

var React        = require('react');
var Router       = require('react-router');
var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Main = require('./components/layouts/main.react');
var Real                            = require('./components/real.react');
var AccountingEntryEdit             = require('./components/accounting-entry-edit.react');
var AccountingEntriesList           = require('./components/accounting-entries-list.react');
var RecurrentAccountingEntries      = require('./components/recurrent-accounting-entries.react');
var RecurrentAccountingEntryNew     = require('./components/recurrent-accounting-entry-new.react');
var Graphs                          = require('./components/graphs.react');

var routes = (
  <Route handler={Main} name="main" path="/" >
    <Route handler={AccountingEntriesList} name="accounting-entries-list" />
    <Route handler={Graphs} name="graphs" />
    <Route handler={RecurrentAccountingEntries} name="recurrent-accounting-entries" />
    <Route handler={RecurrentAccountingEntryNew} name="recurrent-accounting-entry-new"
    path="recurrent-accounting-entry/new" />
    <Route handler={AccountingEntryEdit} name="edit" path="/edit/:accountingEntryId" />
    <DefaultRoute handler={Real} />
  </Route>
);

module.exports = {
  run: function () {
    Router.run(routes, function (Handler) {
      React.render(<Handler/>, document.getElementById('real-container'));
    });
  }
};
