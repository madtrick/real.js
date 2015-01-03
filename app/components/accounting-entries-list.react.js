/** @jsx React.DOM */

var React             = require('react');
var Fluxxor           = require('fluxxor');
var FluxxorMixin      = Fluxxor.FluxMixin(React);
var StoreWatchMixin   = Fluxxor.StoreWatchMixin;
var AccountingEntries = require('./accounting-entries.react');

var AccountingEntriesList = React.createClass({
  mixins: [FluxxorMixin, StoreWatchMixin("AccountingStore", "ProfilesStore")],

  getStateFromFlux: function() {
    return {
      accountingStoreState : this.getFlux().store("AccountingStore").state(),
      entries              : this.getFlux().store("AccountingStore").entries(),
      profiles             : this.getFlux().store("ProfilesStore").profiles()
    };
  },

  handleClickAccountingEntry: function(){
    console.log("value");
  },

  render: function() {
    return (
      <AccountingEntries
        entries={this.state.entries.models}
        profiles={this.state.profiles}
        handleClick={this.handleClickAccountingEntry}
      />
    )
  }
});

module.exports = AccountingEntriesList;
