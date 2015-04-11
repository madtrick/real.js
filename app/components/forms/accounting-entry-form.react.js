/** @jsx React.DOM */
'use strict';

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
            defaultValue={this.props.amount}
            ref="inputField"
          />
          <TagsField
            ref="tagsField"
            tags={this.props.tags}
          />

        <button
          className="btn btn-xlarge btn-success"
          data-behaviour='income'
          type="submit"
        >
        Income
        </button>
        <button
          className="btn btn-xlarge btn-danger"
          data-behaviour='expense'
          onClick={this.handleExpense}
          type="submit"
        >
          Expense
        </button>
      </BaseForm>
  );
  },

  handleExpense: function(){
    var inputFieldValue         = this.refs.inputField.value();
    var negativeInputFieldValue = (inputFieldValue < 0 ? 1 : -1) * inputFieldValue;

    this.refs.inputField.value(negativeInputFieldValue);
  },

  handleSubmit: function(){
    var amountString = this.refs.inputField.value();
    var date         = this.refs.dateField.value();
    var tags         = this.refs.tagsField.value();
    var amount       = parseInt(amountString, 10);


    this.resetInputField();

    return this.props.onSubmit({
      amount: amount,
      tags: tags,
      date: date
    });
  },

  resetInputField: function () {
    this.refs.inputField.value('');
  }

});

module.exports = AccountingEntryForm;
