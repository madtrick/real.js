/** @jsx React.DOM */
'use strict';

var React               = require('react');
var _                   = require('lodash');
var AccountingEntryItem = require('./accounting-entry-item.react');

module.exports = React.createClass({
  // ASC order
  order: function(items){
    return _.sortBy(items, function(e){ return +e.get('date'); });
  },

  render: function(){
    var limit = this.props.limit || this.props.entries.length;

    return (
      <div className="r-accounting-entries">
        {
          _.map(_.last(this.order(this.props.entries), limit), function(e){
            return (
              <AccountingEntryItem
                actions={this.props.actions}
                entry={e}
                handleClick={this.props.handleClick}
                key={e.get('id')}
                profiles={this.props.profiles}
              />
            )
          }, this)
        }
      </div>
    );
  }
});
