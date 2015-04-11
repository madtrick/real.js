/** @jsx React.DOM */
'use strict';

var React      = require('react');
var classnames = require('classnames');
var _          = require('lodash');

exports.TagsList = React.createClass({
  render: function(){
    var tagListClassName;
    var classes;

    classes                       = {'r-tag-list': true};
    classes[this.props.className] = true;
    tagListClassName              = classnames(classes);

    return (
      <div className={tagListClassName}>
      {
        _.map(
          this.props.tags, function(tag){
            return (
              <span
                className="r-tag-list__label label label-default"
                key={tag}
              >
                {tag}
              </span>
            )
          }
        )
      }
      </div>
    );
  }
});
