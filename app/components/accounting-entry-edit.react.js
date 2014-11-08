/** @jsx React.DOM */

var React               = require('react');
var Fluxxor             = require('fluxxor');
var _                   = require('lodash');
var AccountingEntryForm = require('./accounting-entry-form.react');

var StoreWatchMixin     = Fluxxor.StoreWatchMixin;
var FluxxorMixin        = Fluxxor.FluxMixin(React);

var AccountingEntryEdit = React.createClass({
  mixins : [FluxxorMixin, StoreWatchMixin("AccountingStore")],

  getStateFromFlux: function() {
    return {
      entry : this.getFlux().store("AccountingStore").entry(this.props.accountingEntryId)
    };
  },

  handleSubmit: function(values) {
    this.getFlux().actions.updateEntry(_.extend(values, {entry_id: this.state.entry.id}));
    return false;
  },

  render: function() {
    return this.state.entry ?
      <AccountingEntryForm
        amount={this.state.entry.get('amount')}
        tags={_.pluck(this.state.entry.get('tags'), 'name')}
        onSubmit={this.handleSubmit}
      />
      :
       <h1>NOPE</h1>
  }
});

module.exports = AccountingEntryEdit;
