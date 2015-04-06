/** @jsx React.DOM */
'use strict';

var React                  = require('react');
var Reflux                 = require('reflux');
var _                      = require('lodash');
var MainLayout             = require('./layouts/main.react');
var AccountingEntryForm    = require('./forms/accounting-entry-form.react');
var AccountingEntriesStore = require('../stores/accounting-entries');
var actions                = require('../actions');

var mixins = [
  Reflux.connect(AccountingEntriesStore, 'entry')
];

module.exports = React.createClass({
  mixins: mixins,

  componentWillMount: function() {
    actions.fetchAccountingEntry({id: this.props.accountingEntryId});
  },

  handleSubmit: function(values) {
    /*eslint camelcase: [2, {properties: "never"}]*/
    actions.updateAccountingEntry(_.extend(values, {entry_id: this.state.entry.id}));
    return false;
  },

  render: function() {
    return this.state && this.state.entry ?
        <MainLayout>
          <h2> Edit entry </h2>
          <AccountingEntryForm
            amount={this.state.entry.get('amount')}
            onSubmit={this.handleSubmit}
            tags={this.state.entry.get('tags')}
          />
        </MainLayout>
        :
        <h1>NOPE</h1>
  }
});
