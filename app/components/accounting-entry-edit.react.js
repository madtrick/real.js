/** @jsx React.DOM */

var React                  = require('react');
var Reflux                 = require('reflux');
var _                      = require('lodash');
var AccountingEntriesStore = require('../stores/accounting-entries');
var AccountingEntryForm    = require('./forms/accounting-entry-form.react');
var actions                = require('../actions');

var mixins = [
  Reflux.connect(AccountingEntriesStore, 'entry')
];

var AccountingEntryEdit = React.createClass({
  mixins: mixins,

  componentWillMount: function() {
    actions.fetchAccountingEntry({id: this.props.accountingEntryId});
  },

  handleSubmit: function(values) {
    actions.updateAccountingEntry(_.extend(values, {entry_id: this.state.entry.id}));
    return false;
  },

  render: function() {
    return this.state && this.state.entry ?
      <AccountingEntryForm
        amount={this.state.entry.get('amount')}
        tags={this.state.entry.get('tags')}
        onSubmit={this.handleSubmit}
      />
      :
      <h1>NOPE</h1>
  }
});

module.exports = AccountingEntryEdit;
