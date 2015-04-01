/** @jsx React.DOM */

var React  = require('react');
var moment = require('moment');

var DateField  = React.createClass({
  getInitialState: function() {
    return {date: moment().format('YYYY-MM-DD')};
  },

  value: function() {
    return this.state.date;
  },

  render: function(attribute) {
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
      <div className="input-group date-field-container">
        <div className="input-group-addon"><i className="fa fa-calendar"></i></div>
        <input
          className="form-control input-xlarge"
          onClick={this.showDatePicker}
          onChange={function(){}} //function to remove React warnings
          type="text"
          value={this.state.date}
        />
        <input
          ref="dateField"
          type="date"
          min="2014-11-01"
          max="2015-12-31"
          className="date-field__date"
          onChange={this.setSelectedDate}
        />
      </div>
    )
  },

  showDatePicker: function(e) {
    //e.prevenDefault(); //not available until we update to React 0.12
    $(this.refs.dateField.getDOMNode()).click();
    return false;
  },

  setSelectedDate: function(e) {
    this.setState({ date: this.refs.dateField.getDOMNode().value });
    return false;
  }
});

module.exports = DateField;
