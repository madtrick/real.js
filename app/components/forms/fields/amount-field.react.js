/** @jsx React.DOM */
'use strict';

var React  = require('react');

module.exports = React.createClass({
  value: function(value) {
    if (value || value === '') {
      this._DOMNode().value = value;
      return value;
    } else {
      return this._DOMNode().value;
    }
  },

  render: function() {
    return (
      <div className="input-group">
        <div className="input-group-addon"><i className="fa fa-eur"></i></div>
        <input
          className="form-control input-xlarge"
          defaultValue={this.props.defaultValue}
          id="amount"
          placeholder="Enter amount"
          ref="inputField"
          required="required"
          step="any"
          type="number"
        />
      </div>
    );
  },

  _DOMNode: function () {
    return this.refs.inputField.getDOMNode();
  }
});
