/** @jsx React.DOM */

var React               = require('react');
var _                   = require('lodash');
var bus                 = require('../services/bus');
var actions             = require('../actions');
var AccountingEntryForm = require('./forms/accounting-entry-form.react');

var AccountingEntryAdd = React.createClass({

  getInitialState: function() {
    return {tags: []};
  },

  handleSubmit: function(args) {
    actions.createAccountingEntry({amount: args.amount, tags: _.clone(args.tags), date: args.date});
    this.setState({tags: []});
    return false;
  },

  render: function() {
    return <AccountingEntryForm  onSubmit={this.handleSubmit} tags={this.state.tags}/>;
  }
});

module.exports = AccountingEntryAdd;
