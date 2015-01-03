/** @jsx React.DOM */

var React              = require('react');
var Fluxxor            = require('fluxxor');
var _                  = require('lodash');
var Link               = require('rrouter').Link;
var Graph              = require('./graph.react');
var Transformations    = require('../classes/graphs-data/transformations');
var Generators         = require('../classes/graphs-data/generators');
var MonthlyAccTagsData = require('./graphs/monthly-acc-tags-data');
var YearExpensesData   = require('./graphs/year-expenses-data');

var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var FluxxorMixin    = Fluxxor.FluxMixin(React);

var Graphs = React.createClass({
  mixins : [FluxxorMixin, StoreWatchMixin("AccountingStore")],

  getStateFromFlux: function() {
    return {
      entries : this.getFlux().store("AccountingStore").entries()
    };
  },

  render: function(attribute) {
    var yearExpensesData = YearExpensesData.data(this.state.entries);
    var tagsData         = MonthlyAccTagsData.data(this.state.entries, new Date().getMonth(), ['food', 'eating out']);

    return <div>
      <Link to="/main">Home</Link>
      <Graph data={yearExpensesData}/>
      <Graph data={tagsData}/>
    </div>;
  }
});

module.exports = Graphs;
