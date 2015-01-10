/** @jsx React.DOM */

var React               = require('react');
var Fluxxor             = require('fluxxor');
var bus                 = require('../services/bus');
var AccountingEntryForm = require('./accounting-entry-form.react');

var FluxxorMixin = Fluxxor.FluxMixin(React);

var AccountingEntryAdd = React.createClass({
  mixins: [FluxxorMixin],

  getInitialState: function() {
    return {tags: []};
  },

  componentDidMount: function() {
    var self = this;
    bus.bind('reuse-entry', reuseEntry);

    function reuseEntry(data) {
      self.setState({tags: data.tags });
    }
  },

  handleSubmit: function(args) {
    this.getFlux().actions.createEntry({amount: args.amount, tag_list: args.tags, date: args.date});
    this.setState({tags: []});
    return false;
  },

  render: function() {
    return <AccountingEntryForm flux={this.getFlux()} onSubmit={this.handleSubmit} tags={this.state.tags}/>;
  }
});

module.exports = AccountingEntryAdd;
