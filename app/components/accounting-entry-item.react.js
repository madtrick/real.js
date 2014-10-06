/** @jsx React.DOM */

var React  = require("react");
var moment = require('moment');
var _      = require("lodash");
var NullProfile         = require('../models/null-profile');

var AccountingEntryItem = React.createClass({
  render: function(){
    var entry   = this.props.entry,
        profile = this.props.profiles.get(entry.get('user').get('google_id')) || new NullProfile();
    return (
      <div>
          <div className="moment">
            <div className="date">{moment(entry.get('created_at')).format('DD/MM')}</div>
            <div className="time">{moment(entry.get('created_at')).format('hh:mm')}</div>
          </div>
          <div className="picture"><img src={profile.get('image')} /></div>
          <div className="amount">{entry.get('amount')}</div>
          <div className="action"><a href="#" onClick={_.partial(this.props.handleClick, entry)}>reuse</a></div>
          <div className="tags">{_.map(entry.get('tags'), function(tag){return <span className="label label-default">{ tag.name }</span>})}</div>
      </div>
    )
  }
});

module.exports = AccountingEntryItem;
