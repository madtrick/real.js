/** @jsx React.DOM */

var React                  = require('react');
var Reflux                 = require('reflux');
var _                      = require('lodash');
var Link                   = require('rrouter').Link;
var bus                    = require('../services/bus');
var AccountingEntriesStore = require('../stores/accounting-entries');
var actions                = require('../actions');
var MainLayout             = require('./layouts/main.react');
var AccountingEntries      = require('./accounting-entries.react');
var AccountingEntryAdd     = require('./accounting-entry-add.react');
var Navbar                 = require('./navbar.react');


var mixins = [
  Reflux.connect(AccountingEntriesStore, 'entries')
];

var Real = React.createClass({
  mixins: mixins,

  componentWillMount: function() {
    actions.fetchAccountingEntries();
  },

  render: function(){
    return (
      <MainLayout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {
                this.state && this.state.entries && !this.state.entries.isFetching ?
                  <div>
                    <AccountingEntries
                      entries={this.state.entries.models}
                      profiles={this.state.profiles}
                      handleClick={this.handleClickAccountingEntry}
                      limit={3}
                      actions={{edit: true}}
                    />
                    <div className="r-expenses-summary">
                      Expenses this month: {this.state.entries.expenseByMonth((new Date()).getMonth())}
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
      </MainLayout>
    );
  }

});

module.exports = Real;
