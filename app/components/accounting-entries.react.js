/** @jsx React.DOM */

var React       = require('react');
var _           = require('lodash');
var moment      = require('moment');
var NullProfile = require('../models/null-profile');

var AccountingEntries = React.createClass({
  render: function(){
    return (
      <ul className="r-accounting-entries">
        {
          _.map(_.take(this.props.entries, this.props.limit), function(e){
            var profile = this.props.profiles.get(e.get('user').get('google_id')) || new NullProfile();
            return (
              <li className="clearfix">
                <div className="moment">
                  <div className="date">{moment(e.get('created_at')).format('DD/MM')}</div>
                  <div className="time">{moment(e.get('created_at')).format('hh:mm')}</div>
                </div>
                <div className="picture"><img src={profile.get('image')} /></div>
                <div className="amount">{e.get('amount')}</div>
                <div className="action"><a href="#" onClick={_.partial(this.props.handleClick, e)}>reuse</a></div>
                <div className="tags">{_.map(e.get('tags'), function(tag){return <span className="label label-default">{ tag.name }</span>})}</div>
              </li>
            )
          }, this)
        }
      </ul>
    );
  }
});

module.exports = AccountingEntries;
