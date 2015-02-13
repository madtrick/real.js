/** @jsx React.DOM */

var React                      = require('react');
var Fluxxor                    = require('fluxxor');
var Link                       = require('rrouter').Link;
var MainLayout                 = require('./layouts/main.react');
var RecurrentItem              = require('./recurrent-item.react');

var FluxxorMixin      = Fluxxor.FluxMixin(React);
var StoreWatchMixin   = Fluxxor.StoreWatchMixin;

var ReccurringAccountinEntries = React.createClass({
  mixins: [FluxxorMixin, StoreWatchMixin("RecurrentAccountingEntriesStore")],

  componentWillMount: function() {
    this.getFlux().store("RecurrentAccountingEntriesStore").loadEntries();
  },

  getStateFromFlux: function() {
    return {
      recurrentEntries : this.getFlux().store("RecurrentAccountingEntriesStore").entries(),
    };
  },

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
