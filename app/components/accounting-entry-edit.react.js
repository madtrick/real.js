/** @jsx React.DOM */
'use strict';

var React                  = require('react');
var Reflux                 = require('reflux');
var _                      = require('lodash');
var AccountingEntryForm    = require('./forms/accounting-entry-form.react');
var AccountingEntriesStore = require('../stores/accounting-entries');
var actions                = require('../actions');

var mixins = [
  Reflux.connect(AccountingEntriesStore, 'entry')
];

module.exports = React.createClass({
  contextTypes: {
      router: React.PropTypes.func
  },

  mixins: mixins,

  componentWillMount: function() {
    var accountingEntryId = this.context.router.getCurrentParams().accountingEntryId;
    actions.fetchAccountingEntry({id: accountingEntryId});
  },

  handleSubmit: function(values) {
    /*eslint camelcase: [2, {properties: "never"}]*/
    actions.updateAccountingEntry(_.extend(values, {entry_id: this.state.entry.id}));
    return false;
  },

  render: function() {
    return this.state && this.state.entry ?
        <div>
          <h2> Edit entry </h2>
          <AccountingEntryForm
            amount={this.state.entry.get('amount')}
            onSubmit={this.handleSubmit}
            tags={this.state.entry.get('tags')}
          />
        </div>
        :
        <h1>NOPE</h1>
  }
});
