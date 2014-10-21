/** @jsx React.DOM */

var React               = require('react');
var Fluxxor             = require('fluxxor');
var FluxxorMixin        = Fluxxor.FluxMixin(React);
var StoreWatchMixin     = Fluxxor.StoreWatchMixin;
var _                   = require('lodash');
var AccountingStore     = require('../stores/accounting');
var AccountingEntries   = require('./accounting-entries.react');
var AccountingEntryForm = require('./accounting-entry-form.react');
var ErrorsAlert         = require('./errors-alert.react');

var Real = React.createClass({

  mixins: [FluxxorMixin, StoreWatchMixin("AccountingStore", "ProfilesStore")],

  getInitialState: function() {
    return {
      tags: []
    };
  },

  getStateFromFlux: function() {
    return {
      accountingStoreState : this.getFlux().store("AccountingStore").state(),
      entries              : this.getFlux().store("AccountingStore").entries(),
      profiles             : this.getFlux().store("ProfilesStore").profiles()
    };
  },

  handleClickAccountingEntry: function(entry){
    this.setState({tags: _.pluck(entry.get('tags'), 'name')});
    return false;
  },

  handleSubmit: function(e){
    this.setState({tags: []});
    return false;
  },

  render: function(){

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {
                this.state.accountingStoreState == AccountingStore.States.IDLE ?
                  <AccountingEntries
                    entries={this.state.entries}
                    profiles={this.state.profiles}
                    handleClick={this.handleClickAccountingEntry}
                    limit={5}
                  />
                  :
                    <span>Loading <i className="fa fa-spinner fa-spin"></i></span>
              }
            </div>
          </div>
        </div>
        <ErrorsAlert />
        <div className="footer">
          <div className="container-fluid">
            <AccountingEntryForm onSubmit={this.handleSubmit} tags={this.state.tags} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Real;
