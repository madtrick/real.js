/** @jsx React.DOM */

var React             = require('react');
var Fluxxor           = require('fluxxor');
var FluxxorMixin      = Fluxxor.FluxMixin(React);
var _                 = require('lodash');
var StoreWatchMixin   = Fluxxor.StoreWatchMixin;
var AccountingEntries = require('./accounting-entries.react');
var AccountingEntryForm = require('./accounting-entry-form.react');

var Real = React.createClass({

  mixins: [FluxxorMixin, StoreWatchMixin("AccountingStore", "ProfilesStore")],

  getInitialState: function() {
    return {
      tags: []
    };
  },

  getStateFromFlux: function() {
    return {
      entries: this.getFlux().store("AccountingStore").entries(),
      profiles: this.getFlux().store("ProfilesStore").profiles()
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
              <AccountingEntries
                entries={this.state.entries}
                profiles={this.state.profiles}
                handleClick={this.handleClickAccountingEntry}
                limit={5}
              />
            </div>
          </div>
        </div>
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
