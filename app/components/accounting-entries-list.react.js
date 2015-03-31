/** @jsx React.DOM */

var React                  = require('react');
var Reflux                 = require('reflux');
var moment                 = require('moment');
var Link                   = require('rrouter').Link;
var MainLayout             = require('./layouts/main.react');
var AccountingEntries      = require('./accounting-entries.react');
var AccountingEntriesStore = require('../stores/accounting-entries');
var actions                = require('../actions');

var INPUT_DATE_FORMAT = 'YYYY-MM-DD';

var mixins = [
  Reflux.connect(AccountingEntriesStore, 'entries')
];

var AccountingEntriesList = React.createClass({
  mixins: mixins,

  componentWillMount: function () {
    actions.fetchAccountingEntries();
  },

  handleClickAccountingEntry: function(){
  },

  filterEntries: function(){
    var startDate = moment(this.refs.startDate.getDOMNode().value).toDate();
    var endDate   = moment(this.refs.endDate.getDOMNode().value).toDate();

    this.setState({filteredEntries: this.state.entries.findByDateRange(startDate, endDate)});
  },

  render: function() {
    return (
      <MainLayout>
      {
        !this.state.entries ?
          <span>Loading <i className="fa fa-spinner fa-spin"></i></span>
        :
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
              actions={{edit: true}}
            />
          </div>
      }
      </MainLayout>
    )
  }
});

module.exports = AccountingEntriesList;
