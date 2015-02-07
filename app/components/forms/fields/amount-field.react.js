/** @jsx React.DOM */

var React  = require('react');

var AmountField  = React.createClass({
  value: function(value) {
    if (value || value === '') {
      this._DOMNode().value = value;
      return value;
    } else {
      return this._DOMNode().value;
    }
  },

  render: function(attribute) {
    return (
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
    );
  },

  _DOMNode: function () {
    return this.refs.inputField.getDOMNode();
  }
});

module.exports = AmountField;
