/** @jsx React.DOM */
'use strict';

var React                  = require('react');
var Reflux                 = require('reflux');
var moment                 = require('moment');
var MainLayout             = require('./layouts/main.react');
var AccountingEntries      = require('./accounting-entries.react');
var AccountingEntriesStore = require('../stores/accounting-entries');
var actions                = require('../actions');

var INPUT_DATE_FORMAT = 'YYYY-MM-DD';

var mixins = [
  Reflux.connect(AccountingEntriesStore, 'entries')
];

module.exports = React.createClass({
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
              onChange={this.filterEntries}
              ref='startDate'
              type="date"
            />
            <input
              onChange={this.filterEntries}
              ref='endDate'
              type="date"
              value={moment().format(INPUT_DATE_FORMAT)}
            />
            <AccountingEntries
              actions={{edit: true}}
              entries={this.state.filteredEntries || this.state.entries.models}
              handleClick={this.handleClickAccountingEntry}
              profiles={this.state.profiles}
            />
          </div>
      }
      </MainLayout>
    )
  }
});
