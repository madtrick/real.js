/** @jsx React.DOM */

var React               = require('react');
var _                   = require('lodash');
var AccountingEntryItem = require("./accounting-entry-item.react");

var AccountingEntries = React.createClass({
  // ASC order
  order: function(items){
    return _.sortBy(items, function(e){ return +e.get('created_at'); });
  },

  render: function(){
    return (
      <div className="r-accounting-entries">
        {
          _.map(_.last(this.order(this.props.entries), this.props.limit), function(e){
            return (
              <AccountingEntryItem entry={e} profiles={this.props.profiles} handleClick={this.props.handleClick}/>
            )
          }, this)
        }
      </div>
    );
  }
});

module.exports = AccountingEntries;
