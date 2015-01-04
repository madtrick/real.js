/** @jsx React.DOM */

var React             = require('react');
var Fluxxor           = require('fluxxor');
var FluxxorMixin      = Fluxxor.FluxMixin(React);
var StoreWatchMixin   = Fluxxor.StoreWatchMixin;
var moment            = require('moment');
var AccountingEntries = require('./accounting-entries.react');

var INPUT_DATE_FORMAT = 'YYYY-MM-DD';

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

  filterEntries: function(){
    var startDate = moment(this.refs.startDate.getDOMNode().value).toDate();
    var endDate   = moment(this.refs.endDate.getDOMNode().value).toDate();

    this.setState({filteredEntries: this.state.entries.findByDateRange(startDate, endDate)});
  },

  render: function() {
    return (
      <div>
      <input
        type="date"
        ref='startDate'
        onChange={this.filterEntries}
      />
      <input
        type="date"
        ref='endDate'
        value={moment().format(INPUT_DATE_FORMAT)}
        onChange={this.filterEntries}
      />
      <AccountingEntries
        entries={this.state.filteredEntries || this.state.entries.models}
        profiles={this.state.profiles}
        handleClick={this.handleClickAccountingEntry}
      />
      </div>
    )
  }
});

module.exports = AccountingEntriesList;
