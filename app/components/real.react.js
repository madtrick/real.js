/** @jsx React.DOM */
'use strict';

var React                  = require('react');
var Reflux                 = require('reflux');
var AccountingEntriesStore = require('../stores/accounting-entries');
var actions                = require('../actions');
var AccountingEntries      = require('./accounting-entries.react');
var AccountingEntryAdd     = require('./accounting-entry-add.react');

var mixins = [
  Reflux.connect(AccountingEntriesStore, 'entries')
];

module.exports = React.createClass({
  mixins: mixins,

  componentWillMount: function() {
    actions.fetchAccountingEntries();
  },

  render: function(){
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {
                this.state && this.state.entries && !this.state.entries.isFetching ?
                  <div>
                    <AccountingEntries
                      actions={{edit: true}}
                      entries={this.state.entries.models}
                      handleClick={this.handleClickAccountingEntry}
                      limit={3}
                      profiles={this.state.profiles}
                    />
                    <div className="r-expenses-summary">
                      Expenses this month:
                      {this.state.entries.expenseByMonth((new Date()).getMonth())}
                    </div>
                  </div>
                  :
                    <span>Loading <i className="fa fa-spinner fa-spin"></i></span>
              }
            </div>
          </div>
        </div>
        <footer>
          <div className="container-fluid">
            <AccountingEntryAdd/>
          </div>
        </footer>
      </div>
    );
  }
});
