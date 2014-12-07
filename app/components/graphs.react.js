/** @jsx React.DOM */

var React           = require('react');
var Fluxxor         = require('fluxxor');
var _               = require('lodash');
var Transformations = require('../classes/graphs-data-transformations/transformations');

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
    var data = new Transformations().accumulatedPerDay(this.transform_data());


    // Important check. If the array is empty
    // the Graph library will crash
    if (data.length > 0) {
      data_graphic({
        title: "Annotations",
        description: "By setting the graphic's target a class name of main-area-solid, markers don't extend down to the bottom of the graphic, which better draws attention to, say, spikes.",
        data: data,
        width: 1000,
        interpolate: 'step',
        target: '#target',
        x_accessor: 'date',
        y_accessor: 'value'
      });
    }

    return <div className="r-graph-container" id="target"></div>;
  },

  transform_data: function() {
    if (!this.state.entries) return;

    return this.state.entries.map(function(e){
      return {date: e.get('created_at'), value: Math.abs(e.get('amount'))};
    });
  }
});

module.exports = Graphs;
