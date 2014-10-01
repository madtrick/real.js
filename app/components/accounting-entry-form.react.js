/** @jsx React.DOM */

var React             = require('react');
var Fluxxor           = require('fluxxor');
var TagInput          = require('./tag-input.react');
var FluxxorChildMixin = Fluxxor.FluxChildMixin(React);

var AccountingEntryForm = React.createClass({

  mixins : [FluxxorChildMixin],

  render: function(){
    return (
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="amount">Amount</label>
              <input ref="inputField" type="number" className="form-control input-xlarge" id="amount" placeholder="Enter amount" required="required" />
              <TagInput tags={this.props.tags} ref="tagInput"/>
            </div>
            <button type="submit" onClick={this.handleExpense} className="btn btn-xlarge btn-danger" data-behaviour='expense'>Expense</button>
            <button type="submit" className="btn btn-xlarge btn-success" data-behaviour='income'>Income</button>
          </form>
    );
  },

  handleExpense: function(){
    this.inputFieldDOMNode().value = -this.inputFieldDOMNodeValue();
    return true;
  },

  handleSubmit: function(e){
    var amount = this.inputFieldDOMNodeValue();

    this.inputFieldDOMNode().value = null;
    this.getFlux().actions.createEntry({amount: amount, tag_list: this.refs.tagInput.getTagValues()});
    return this.props.onSubmit();
  },

  inputFieldDOMNodeValue: function(){
    return this.inputFieldDOMNode().value;
  },

  inputFieldDOMNode: function(){
    return this.refs.inputField.getDOMNode();
  }
});

module.exports = AccountingEntryForm;
