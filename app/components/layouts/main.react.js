/** @jsx React.DOM */
'use strict';

var React        = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Navbar       = require('../navbar.react');
var ErrorsAlert  = require('../errors-alert.react');

var Main = React.createClass({

  render: function(){
    return (
      <div>
        <Navbar/>
        <ErrorsAlert />
        <RouteHandler />
      </div>
    );
  }

});

module.exports = Main;
