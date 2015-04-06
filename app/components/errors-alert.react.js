/** @jsx React.DOM */
'use strict';

var React       = require('react/addons');
var Reflux      = require('reflux');
var _           = require('lodash');
var ErrorsStore = require('../stores/errors');

var mixins = [
  Reflux.connect(ErrorsStore, 'errors')
];

var ErrorsAlert = React.createClass({
  mixins: mixins,

  render: function() {
    var errors     = this.state.errors;
    var classNames = React.addons.classSet({
      'alert': true,
      'alert-danger': true,
      'hidden': errors.length < 1
    });

    return (
        <div className={classNames}>
          <ul>
            {_.map(errors, function(e){return <li>{e}</li>})}
          </ul>
        </div>
    );
  }
});

module.exports = ErrorsAlert;
