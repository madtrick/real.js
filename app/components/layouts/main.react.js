/** @jsx React.DOM */
'use strict';

var React       = require('react');
var Navbar      = require('../navbar.react');
var ErrorsAlert = require('../errors-alert.react');

var Main = React.createClass({

  render: function(){
    return (
      <div>
        <Navbar/>
        <ErrorsAlert />
        {this.props.children}
      </div>
    );
  }

});

module.exports = Main;
