/** @jsx React.DOM */
'use strict';

var React  = require('react');
var moment = require('moment');

var DateField  = React.createClass({
  getInitialState: function() {
    return {date: moment().format('YYYY-MM-DD')};
  },

  value: function() {
    return this.state.date;
  },

  render: function() {
    /*
     * IMPORTANT NOTE
     *
     * I'm setting the 'min' and 'max' values of the datepicker
     * because of a bug in Chrome 39. Without the limits the calendar
     * tries to handle too many dates at once and is very slow.
     *
     * This is the bug in the chromium tracker:
     *
     * https://code.google.com/p/chromium/issues/detail?id=441060
     *
     * Remove the limits once fixed
     */
    return (
      <div className="form-group">
      <div className="input-group date-field-container">
        <div className="input-group-addon"><i className="fa fa-calendar"></i></div>
        <input
          className="form-control"
          onChange={function (){}} // function to remove react warning
          onClick={this.showDatePicker}
          type="text"
          value={this.state.date}
        />
        <input
          className="date-field__date"
          max="2015-12-31"
          min="2014-11-01"
          onChange={this.setSelectedDate}
          ref="dateField"
          type="date"
        />
      </div>
    </div>
    )
  },

  showDatePicker: function(e) {
    e.stopPropagation();
    $(this.refs.dateField.getDOMNode()).click();
  },

  setSelectedDate: function(e) {
    e.stopPropagation();
    this.setState({ date: this.refs.dateField.getDOMNode().value });
  }
});

module.exports = DateField;
