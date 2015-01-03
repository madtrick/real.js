/** @jsx React.DOM */

var React = require('react');
var _     = require('lodash');

var Graph = React.createClass({
  getInitialState: function (){
    return {graphId: _.uniqueId('graph-'), isDataValid: true};
  },

  componentWillReceiveProps: function(props){
    if (!this._isDataValid(props.data)){
      this.setState({isDataValid : false });
      return;
    }

    data_graphic({
      title: "Annotations",
      description: "By setting the graphic's target a class name of main-area-solid, markers don't extend down to the bottom of the graphic, which better draws attention to, say, spikes.",
      data: props.data,
      width: 1000,
      interpolate: 'step',
      target: '#' + this.state.graphId,
      x_accessor: 'date',
      y_accessor: 'value'
    });
  },

  render: function() {
    if (!this.state.isDataValid){
      return <h1>Invalid data. Can not render the graph</h1>
    }

    return <div id={this.state.graphId} className='r-graph-container'></div>;
  },

  _isDataValid: function(data){
    var that = this;

    if (data.length == 0) return false;

    /* There's a bug that crashes data_graphics library
     * when only one data element is on the data set.
     *
     * This is the issue:
     * https://github.com/mozilla/metrics-graphics/issues/289
     */
    if (data.length == 1) return false;

    var isArrayOfArrays   = _.all(data, function(element){ return _.isArray(element); });
    var hasEmptySubArrays = isArrayOfArrays && _.any(data, function(element){
      return !that._isDataValid(element);
    });

    return  !hasEmptySubArrays;
  }
});

module.exports = Graph;
