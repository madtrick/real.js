/** @jsx React.DOM */

var React             = require('react');
var Fluxxor           = require('fluxxor');
var FluxxorMixin      = Fluxxor.FluxMixin(React);
var _                 = require('lodash');
var StoreWatchMixin   = Fluxxor.StoreWatchMixin;
var AccountingEntries = require('./accounting-entries.react');

var Real = React.createClass({

  mixins: [FluxxorMixin, StoreWatchMixin("AccountingStore", "ProfilesStore")],

  getStateFromFlux: function() {
    return {
      entries: this.getFlux().store("AccountingStore").entries(),
      profiles: this.getFlux().store("ProfilesStore").profiles()
    };
  },

  componentDidMount: function() {
    this.taggle = new Taggle('tags');
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-xs-12">
          <AccountingEntries entries={this.state.entries} profiles={this.state.profiles}/>
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="amount">Amount</label>
              <input ref="inputField" type="number" className="form-control input-xlarge" id="amount" placeholder="Enter amount" required="required"/>
              <div className="clearfix" id="tags"></div>
            </div>
            <button type="submit" onClick={this.handleExpense} className="btn btn-xlarge btn-danger" data-behaviour='expense'>Expense</button>
            <button type="submit" onClick={this.handleIncome} className="btn btn-xlarge btn-success" data-behaviour='income'>Income</button>
          </form>
        </div>
      </div>
    );
  },

  handleIncome: function(){
    this.inputFieldDOMNode().value = Math.abs(this.inputFieldDOMNode().value);
    return true;
  },

  handleExpense: function(){
    this.inputFieldDOMNode().value = -this.inputFieldDOMNode().value;
    return true;
  },

  handleSubmit: function(e){
    var amount = this.refs.inputField.getDOMNode().value;

    this.getFlux().actions.createEntry({amount: amount, tag_list: this.taggle.getTagValues()});
    return false;
  },

  inputFieldDOMNode: function(){
    return this.refs.inputField.getDOMNode();
  }

});

module.exports = Real;
