/** @jsx React.DOM */
'use strict';

var React                           = require('react');
var Reflux                          = require('reflux');
var Link                            = require('react-router').Link;
var RecurrentAccountingEntriesStore = require('../stores/recurrent-accounting-entries');
var RecurrentItem                   = require('./recurrent-item.react');

var mixins = [
  Reflux.connect(RecurrentAccountingEntriesStore, 'recurrentEntries')
];

module.exports = React.createClass({
  mixins: mixins,

  render: function() {
    var recurrentAccountingEntries = this.state.recurrentEntries;

    return (
      <div>
        <Link
          className="btn btn-default"
          to="recurrent-accounting-entry-new"
          >
          + Recurrent entry
        </Link>
        <ul className="r-recurrent-accounting-entries">
          {
            recurrentAccountingEntries.map(function (rae) {
              return (
                <RecurrentItem
                  item={rae}
                  key={rae.get('id')}
                />
              );
            })
          }
        </ul>
      </div>
    );
  }
});
