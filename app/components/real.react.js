/** @jsx React.DOM */

var React              = require('react');
var Fluxxor            = require('fluxxor');
var FluxxorMixin       = Fluxxor.FluxMixin(React);
var StoreWatchMixin    = Fluxxor.StoreWatchMixin;
var _                  = require('lodash');
var Link               = require('rrouter').Link;
var bus                = require('../services/bus');
var AccountingStore    = require('../stores/accounting');
var MainLayout         = require('./layouts/main.react');
var AccountingEntries  = require('./accounting-entries.react');
var AccountingEntryAdd = require('./accounting-entry-add.react');
var Navbar             = require('./navbar.react');

var Real = React.createClass({

  mixins: [FluxxorMixin, StoreWatchMixin("AccountingStore", "ProfilesStore")],

  getStateFromFlux: function() {
    return {
      accountingStoreState : this.getFlux().store("AccountingStore").state(),
      entries              : this.getFlux().store("AccountingStore").entries(),
      profiles             : this.getFlux().store("ProfilesStore").profiles()
    };
  },

  render: function(){

    return (
      <MainLayout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {
                this.state.accountingStoreState == AccountingStore.States.IDLE ?
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
            <AccountingEntryAdd flux={this.getFlux()}/>
          </div>
        </footer>
      </MainLayout>
    );
  }

});

module.exports = Real;
