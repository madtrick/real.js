/** @jsx React.DOM */

var React        = require('react');
var TagInput     = require('./tag-input.react');

var AccountingEntryForm = React.createClass({

  render: function(){
    return (
          <form role="form" className="r-accounting-entry-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="amount">Amount</label>
              <input
                ref="inputField"
                type="number"
                className="form-control input-xlarge"
                id="amount"
                placeholder="Enter amount"
                required="required"
                step="any"
                defaultValue={this.props.amount}
              />
              <TagInput tags={this.props.tags} ref="tagInput"/>
            </div>
            <button type="submit" className="btn btn-xlarge btn-success" data-behaviour='income'>Income</button>
            <button type="submit" onClick={this.handleExpense} className="btn btn-xlarge btn-danger" data-behaviour='expense'>Expense</button>
          </form>
    );
  },

  handleExpense: function(){
    this.inputFieldDOMNode().value = (this.inputFieldDOMNodeValue() < 0 ? 1 : -1) * this.inputFieldDOMNodeValue();
    return true;
  },

  handleSubmit: function(e){
    var amount = this.inputFieldDOMNodeValue();

    return this.props.onSubmit({amount: parseInt(amount, 10), tags: this.refs.tagInput.getTagValues()});
  },

  inputFieldDOMNodeValue: function(){
    return this.inputFieldDOMNode().value;
  },

  inputFieldDOMNode: function(){
    return this.refs.inputField.getDOMNode();
  }
});

module.exports = AccountingEntryForm;
