/** @jsx React.DOM */

var React       = require('react');
var BaseForm    = require('./base-form.react');
var TagsField   = require('./fields/tags-field.react');
var DateField   = require('./fields/date-field.react');
var AmountField = require('./fields/amount-field.react');

var AccountingEntryForm = React.createClass({
  render: function(){
    return (
      <BaseForm onSubmit={this.handleSubmit}>
          <DateField
            ref="dateField"
          />
          <AmountField
            ref="inputField"
            defaultValue={this.props.amount}
          />
          <TagsField
            ref="tagsField"
            tags={this.props.tags}
          />

          <button type="submit" className="btn btn-xlarge btn-success" data-behaviour='income'>Income</button>
          <button type="submit" onClick={this.handleExpense} className="btn btn-xlarge btn-danger" data-behaviour='expense'>Expense</button>
      </BaseForm>
  );
  },

  handleExpense: function(){
    var inputFieldValue         = this.refs.inputField.value();
    var negativeInputFieldValue = (inputFieldValue < 0 ? 1 : -1) * inputFieldValue ;

    this.refs.inputField.value(negativeInputFieldValue);
    return true;
  },

  handleSubmit: function(e){
    var amountString = this.refs.inputField.value();
    var date         = this.refs.dateField.value();
    var tags         = this.refs.tagsField.value();
    var amount       = parseInt(amountString, 10);


    this.resetInputField();

    return this.props.onSubmit({
      amount : amount,
      tags   : tags,
      date   : date
    });
  },

  resetInputField: function () {
    this.refs.inputField.value('');
  }

});

module.exports = AccountingEntryForm;
