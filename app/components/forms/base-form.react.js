/** @jsx React.DOM */

var React = require('react');

var BaseForm = React.createClass({
  render: function(){
    return (
          <form role="form" className="r-accounting-entry-form" onSubmit={this.handleSubmit}>
            <div className="form-group r-accounting-entry-form-group">
              {this.props.children}
            </div>
          </form>
    );
  },

  handleSubmit: function(e){
    this.props.onSubmit();
    return false;
  }
});

module.exports = BaseForm;
