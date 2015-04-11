/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (
      <form
        className="r-accounting-entry-form"
        onSubmit={this.handleSubmit}
        role="form"
      >
        <div className="form-group r-accounting-entry-form-group">
          {this.props.children}
        </div>
      </form>
    );
  },

  handleSubmit: function(event){
    event.preventDefault();
    this.props.onSubmit();
  }
});
