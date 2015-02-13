/** @jsx React.DOM */

var React       = require('react/addons');
var Fluxxor     = require('fluxxor');
var BaseForm    = require('./forms/base-form.react');
var TagsField   = require('./forms/fields/tags-field.react');
var AmountField = require('./forms/fields/amount-field.react');

var FluxxorMixin = Fluxxor.FluxMixin(React);

var RecurrentAccountingEntryNew = React.createClass({
  mixins: [FluxxorMixin],

  render: function () {
    return (
      <BaseForm onSubmit={this.handleSubmit}>
          <AmountField
            ref="inputField"
          />
          <TagsField
            ref="tagsField"
          />

          <button type="submit" className="btn btn-xlarge btn-success" data-behaviour='income'>Save</button>
      </BaseForm>
    )
  },

  handleSubmit: function() {
    var amount = this.refs.inputField.value();
    var tags   = this.refs.tagsField.value();

    this.getFlux()
      .actions.createRecurrentEntry(
        {
          amount: amount,
          tag_list: tags
        }
      );
  }
});

module.exports = RecurrentAccountingEntryNew;
