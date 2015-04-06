/** @jsx React.DOM */
'use strict';

var React = require('react');
var Link  = require('rrouter').Link;

var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              className="navbar-toggle collapsed"
              data-target="#bs-example-navbar-collapse-1"
              data-toggle="collapse"
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Real</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/graphs">Graphs</Link>
              </li>
              <li>
                <Link to="/accounting-entries-list">Accounting entries</Link>
              </li>
              <li>
                <Link to="/recurrent-accounting-entries">Recurrent entries</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
});

module.exports = Navbar;
