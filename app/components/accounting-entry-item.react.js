/** @jsx React.DOM */

var React       = require("react");
var moment      = require('moment');
var _           = require("lodash");
var Link        = require('rrouter').Link;
var NullProfile = require('../models/null-profile');

var AccountingEntryItem = React.createClass({
  render: function(){
    var entry   = this.props.entry,
        profile = this.props.profiles.get(entry.get('user').get('google_id')) || new NullProfile();
    return (
      <div className="r-accounting-entry-item clearfix">
          <div className="r-accounting-entry-item__picture"><img src={profile.get('image')} /></div>
          <div className="r-accounting-entry-item__tags">{_.map(entry.get('tags'), function(tag){return <span className="r-accounting-entry-item-tag__label label label-default">{ tag.name }</span>})}</div>
          <div className="r-accounting-entry-item__details">
            <div className="r-accounting-entry-item__date">{moment(entry.get('date')).format('DD/MM')}</div>
          {
            this.props.actions && this.props.actions.edit &&
              <div className="r-accounting-entry-item__action">
                <Link to="/edit" accountingEntryId={entry.id}>edit</Link>
              </div>
          }
          </div>
          <div className="r-accounting-entry-item__amount">{entry.get('amount')}</div>
      </div>
    )
  }
});

module.exports = AccountingEntryItem;
