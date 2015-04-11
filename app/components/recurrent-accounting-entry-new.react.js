/** @jsx React.DOM */
'use strict';

var React       = require('react/addons');
var BaseForm    = require('./forms/base-form.react');
var TagsField   = require('./forms/fields/tags-field.react');
var AmountField = require('./forms/fields/amount-field.react');
var actions     = require('../actions');

var RecurrentAccountingEntryNew = React.createClass({
  contextTypes: {
      router: React.PropTypes.func
  },

  render: function () {
    return (
      <div>
        <BaseForm onSubmit={this.handleSubmit}>
            <AmountField
              ref="inputField"
            />
            <TagsField
              ref="tagsField"
            />

          <button
            className="btn btn-xlarge btn-success"
            data-behaviour='income'
            type="submit"
          >
            Save
          </button>
        </BaseForm>
      </div>
    );
  },

  handleSubmit: function() {
    var amount = this.refs.inputField.value();
    var tags   = this.refs.tagsField.value();

    actions.createRecurrentAccountingEntry(
      {
        period: 1, //hardcoded to the first day of the month
        amount: amount,
        tags: tags
      }
    );

    this.context.router.transitionTo('recurrent-accounting-entries');
  }
});

module.exports = RecurrentAccountingEntryNew;
