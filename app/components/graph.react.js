/** @jsx React.DOM */
'use strict';

var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({
  getInitialState: function (){
    var graphId        = _.uniqueId('graph-');
    var legendsDOMElId = graphId + '-legends';

    return {graphId: graphId, legendsDOMElId: legendsDOMElId};
  },

  componentWillReceiveProps: function(props){
    this._prepareGraph(props.data);
  },

  componentDidMount: function() {
    this._prepareGraph(this.props.data);
  },

  render: function() {
    return (
      <div>
        {!this._isDataValid(this.props.data) && <h1>Invalid data. Can not render the graph</h1>}
        <div
          className='r-graph-container'
          id={this.state.graphId}
        ></div>;
        <div id={this.state.legendsDOMElId}></div>
      </div>
    )
  },

  _prepareGraph: function(data) {
    if (!this._isDataValid(data)) {
      return;
    }

    /*
     * NOTE
     *
     * Don't know why but rendering a graph with just
     * one element with value == 0 triggers this errors
     *
     *  Error: Invalid value for <line> attribute y1="NaN"
     *  Error: Invalid value for <line> attribute y2="NaN"
     *
     * The graphs seems to be rendered ok anyway
     */

    /*eslint camelcase: [2, {properties: "never"}]*/
    /*global MG*/
    MG.data_graphic({
      title: this.props.title,
      description: 'Description',
      data: data,
      legend: this.props.labels,
      legend_target: '#' + this.state.legendsDOMElId,
      interpolate: 'step',
      target: '#' + this.state.graphId,
      x_accessor: 'date',
      y_accessor: 'value'
    });
  },

  _isDataValid: function(data){
    var that = this;

    if (data.length === 0) {
      return false;
    }

    var isArrayOfArrays   = _.all(data, function(element){ return _.isArray(element); });
    var hasEmptySubArrays = isArrayOfArrays && _.any(data, function(element){
      return !that._isDataValid(element);
    });

    return  !hasEmptySubArrays;
  }
});
