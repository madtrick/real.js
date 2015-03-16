/** @jsx React.DOM */

var React                           = require('react');
var Reflux                          = require('reflux');
var Link                            = require('rrouter').Link;
var RecurrentAccountingEntriesStore = require('../stores/recurrent-accounting-entries');
var MainLayout                      = require('./layouts/main.react');
var RecurrentItem                   = require('./recurrent-item.react');

var mixins = [
  Reflux.connect(RecurrentAccountingEntriesStore, 'recurrentEntries')
];

var ReccurringAccountinEntries = React.createClass({
  mixins: mixins,

  render: function() {
    var recurrentAccountingEntries = this.state.recurrentEntries;

    return (
      <MainLayout>
        <Link
          className="btn btn-default"
          to="/recurrent-accounting-entry-new"
        >+ Recurrent entry</Link>
        <ul className="r-recurring-accounting-entries">
          {
            recurrentAccountingEntries.map(function (rae) {
              return <RecurrentItem item={rae}/>;
            })
          }
        </ul>
      </MainLayout>
    );
  }
});
module.exports = ReccurringAccountinEntries;
