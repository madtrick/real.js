/** @jsx React.DOM */

var React = require('react');
var _     = require("lodash");

var TagInput = React.createClass({
  componentDidMount: function(){
    this.taggle = new Taggle('tags');
    this.setTags(this.props);
  },

  componentWillReceiveProps: function(props){
    this.setTags(props);
  },

  getTagValues: function(){
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

  render : function(){
    return (
      <div className="clearfix" id="tags"></div>
    );
  },

  setTags: function(props) {
    this.empty();
    this.taggle.add(props.tags);
  },

});

module.exports = TagInput;