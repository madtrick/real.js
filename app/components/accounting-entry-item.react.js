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
          <div className="r-accounting-entry-item__moment">
            <div className="r-accounting-entry-item__date">{moment(entry.get('created_at')).format('DD/MM')}</div>
            <div className="r-accounting-entry-item__time">{moment(entry.get('created_at')).format('hh:mm')}</div>
          </div>
          <div className="r-accounting-entry-item__picture"><img src={profile.get('image')} /></div>
          <div className="r-accounting-entry-item__amount">{entry.get('amount')}</div>
          <div className="r-accounting-entry-item__tags">{_.map(entry.get('tags'), function(tag){return <span className="r-accounting-entry-item-tag__label label label-default">{ tag.name }</span>})}</div>
          {
            this.props.actions && this.props.actions.reuse &&
              <div className="r-accounting-entry-item__action r-accounting-entry-item__action--edit">
                <a href="#" className="btn" onClick={_.partial(this.props.handleClick, entry)}>
                  <i className="fa fa-refresh"></i>
                </a>
              </div>
          }
          {
            this.props.actions && this.props.actions.edit &&
              <div className="r-accounting-entry-item__action">
                <Link to="/edit" accountingEntryId={entry.id}>edit</Link>
              </div>
          }
      </div>
    )
  }
});

module.exports = AccountingEntryItem;
