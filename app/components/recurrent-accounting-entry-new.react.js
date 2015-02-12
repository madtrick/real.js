/** @jsx React.DOM */

var React       = require('react/addons');
var BaseForm    = require('./forms/base-form.react');
var TagsField   = require('./forms/fields/tags-field.react');
var AmountField = require('./forms/fields/amount-field.react');

var RecurrentAccountingEntryNew = React.createClass({
  render: function () {
    return (
      <BaseForm>
          <AmountField
            ref="inputField"
          />
          <TagsField
            ref="tagsField"
          />

          <button type="submit" className="btn btn-xlarge btn-success" data-behaviour='income'>Save</button>
      </BaseForm>
    )
  }
});

module.exports = RecurrentAccountingEntryNew;
