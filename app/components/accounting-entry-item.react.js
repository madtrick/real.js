/** @jsx React.DOM */
'use strict';

var React       = require('react');
var moment      = require('moment');
var Link        = require('rrouter').Link;
var NullProfile = require('../models/null-profile');
var TagsList     = require('./helpers.react').TagsList;

module.exports = React.createClass({
  render: function(){
    var entry   = this.props.entry,
        profile = entry.get('profile') || new NullProfile();
    return (
      <div className="r-accounting-entry-item clearfix">
          <div className="r-accounting-entry-item__picture"><img src={profile.get('image')} /></div>
          <div className="r-accounting-entry-item__tags">
            <TagsList tags={entry.get('tags')} />
          </div>
          <div className="r-accounting-entry-item__details">
            <div className="r-accounting-entry-item__date">
              {moment(entry.get('date')).format('DD/MM')}
            </div>
          {
            this.props.actions && this.props.actions.edit &&
              <div className="r-accounting-entry-item__action">
                <Link
                  accountingEntryId={entry.id}
                  to="/edit"
                >
                edit
                </Link>
              </div>
          }
          </div>
          <div className="r-accounting-entry-item__amount">{entry.get('amount')}</div>
      </div>
    )
  }
});
