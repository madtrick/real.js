/** @jsx React.DOM */
'use strict';

var React       = require('react/addons');
var RRouter     = require('rrouter');
var BaseForm    = require('./forms/base-form.react');
var TagsField   = require('./forms/fields/tags-field.react');
var AmountField = require('./forms/fields/amount-field.react');
var actions     = require('../actions');
var MainLayout  = require('../components/layouts/main.react');

var RoutingContextMixin = RRouter.RoutingContextMixin;

var RecurrentAccountingEntryNew = React.createClass({
  mixins: [RoutingContextMixin],

  render: function () {
    return (
      <MainLayout>
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
      </MainLayout>
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

    this.navigateTo('recurrent-accounting-entries');
  }
});

module.exports = RecurrentAccountingEntryNew;
