/** @jsx React.DOM */

var React     = require('react');
var TagInput  = require('./tag-input.react');
var DateField = require('./date-field.react');

var AccountingEntryForm = React.createClass({

  render: function(){
    return (
          <form role="form" className="r-accounting-entry-form" onSubmit={this.handleSubmit}>
            <div className="form-group r-accounting-entry-form-group">
              <DateField ref="dateField"/>
              <div className="input-group">
                <div className="input-group-addon"><i className="fa fa-eur"></i></div>
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
              </div>
              <TagInput tags={this.props.tags} ref="tagInput"/>
            </div>
            <button type="submit" className="btn btn-xlarge btn-success" data-behaviour='income'>Income</button>
            <button type="submit" onClick={this.handleExpense} className="btn btn-xlarge btn-danger" data-behaviour='expense'>Expense</button>
          </form>
    );
  },

  handleExpense: function(){
    this.setInputField( (this.inputFieldDOMNodeValue() < 0 ? 1 : -1) * this.inputFieldDOMNodeValue() );
    return true;
  },

  handleSubmit: function(e){
    var amount = this.inputFieldDOMNodeValue();
    var date   = this.dateFieldDOMNodeValue();

    this.resetInputField();

    return this.props.onSubmit({
      amount: parseInt(amount, 10),
      tags: this.refs.tagInput.getTagValues(),
      date: date
    });
  },

  dateFieldDOMNodeValue: function(){
    //return this.DOMNode('dateField').value;
    return this.refs.dateField.value();
  },

  inputFieldDOMNodeValue: function(){
    return this.DOMNode('inputField').value;
  },

  DOMNode: function(ref){
    return this.refs[ref].getDOMNode();
  },

  setInputField: function (value){
    this.resetField('inputField', value);
  },

  resetInputField: function () {
    this.resetField('inputField', '');
  },

  resetField: function(ref, value) {
    this.DOMNode(ref).value = value;
  }
});

module.exports = AccountingEntryForm;
