/** @jsx React.DOM */
'use strict';

var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({
  componentDidMount: function(){
    /* global Taggle */
    this.taggle = new Taggle('tags');
    this.setTags(this.props);
  },

  componentWillReceiveProps: function(props){
    this.setTags(props);
  },

  value: function(){
    return this.taggle.getTagValues();
  },

  empty: function(){
    /* remove the current tags.
     *
     * can't use directly the array returned from
     * this.taggle.getTagValues() because we are
     * using that very array to iterate in the loop
     */
    _.each(_.clone(this.taggle.getTagValues()), this.taggle.remove);

  },

  render: function(){
    return (
      <div className="r-tags-container clearfix">
        <div className="r-tags-icon"><i className="fa fa-tags"></i></div>
        <div id="tags"></div>
      </div>
    );
  },

  setTags: function(props) {
    this.empty();
    this.taggle.add(props.tags);
  }

});
