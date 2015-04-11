/** @jsx React.DOM */
'use strict';

var React               = require('react');
var _                   = require('lodash');
var actions             = require('../actions');
var AccountingEntryForm = require('./forms/accounting-entry-form.react');

module.exports = React.createClass({

  getInitialState: function() {
    return {tags: []};
  },

  handleSubmit: function(args) {
    actions.createAccountingEntry({amount: args.amount, tags: _.clone(args.tags), date: args.date});
    this.setState({tags: []});
  },

  render: function() {
    return <AccountingEntryForm  onSubmit={this.handleSubmit} tags={this.state.tags}/>;
  }
});
