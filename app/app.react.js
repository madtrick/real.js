/** @jsx React.DOM */

var React             = require('react');
var Fluxxor           = require('fluxxor');
var AccountingStore   = require('./stores/accounting');
var AccountingEntries = require('./collections/accounting_entries');
var Real              = require('./components/real.react');

var stores = { AccountingStore: new AccountingStore({collection: new AccountingEntries()}) };
var actions = {
  createEntry : function(payload){
    this.dispatch('CREATE_ENTRY', payload);
  }
};

var flux = new Fluxxor.Flux(stores, actions);

React.renderComponent(<Real flux={flux}/>, document.getElementById('real-container'));
