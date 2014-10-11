/** @jsx React.DOM */

var React  = require('react/addons');
var _      = require('lodash');
var Errors = require('../services/errors');

var ErrorsAlert = React.createClass({
  render: function() {
    var classNames = React.addons.classSet({
      'alert': true,
      'alert-danger': true,
      'hidden': Errors.size() < 1
    });

    return (
        <div className={classNames}>
          <ul>
            {_.map(Errors.reset(), function(e){return <li>{e}</li>})}
          </ul>
        </div>
    );
  }
});

module.exports = ErrorsAlert;
