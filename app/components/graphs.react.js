/** @jsx React.DOM */

var React           = require('react');
var Fluxxor         = require('fluxxor');
var _               = require('lodash');
var Transformations = require('../classes/graphs-data/transformations');
var Generators      = require('../classes/graphs-data/generators');

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
    var data_transformed = this.transform_data(this.state.entries.models);
    var data = new Transformations().accumulatedPerDay(data_transformed.expenses);


    var dataNovember     = this.transform_data(this.state.entries.findByMonth(10));
    var expensesNovember = new Transformations().accumulatedPerDay(dataNovember.expenses);



    // Important check. If the array is empty
    // the Graph library will crash. By graph library
    // I mean the data_graphic function
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

  if (expensesNovember.length > 0)
      {
        data_graphic({
          data: [expensesNovember, [{date: expensesNovember[0].date, value:2200}, {date: expensesNovember[expensesNovember.length - 1].date, value: 2200}]],
          height: 500,
          width: 1000,
          interpolate: 'step',
          target: '#target2',
          x_accessor: 'date',
          y_accessor: 'value'
        });
      }


    return <div>
      <div className="r-graph-container" id="target"></div>
      <div className="r-graph-container" id="target2"></div>
    </div>;
  },

  transform_data: function(entries) {
    if (!this.state.entries) return;

    d = {expenses: [], incomes: []};

    entries.map(function(e){
      if (e.get('amount') < 0)
        d.expenses.push( {date: e.get('created_at'), value: Math.abs(e.get('amount'))} );
      else
        d.incomes.push( {date: e.get('created_at'), value: e.get('amount')} );
    });

    return d;
  }

});

module.exports = Graphs;
