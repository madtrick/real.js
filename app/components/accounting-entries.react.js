/** @jsx React.DOM */

var React       = require('react');
var _           = require('lodash');
var moment      = require('moment');
var NullProfile = require('../models/null-profile');

var AccountingEntries = React.createClass({
  render: function(){
    return (
      <table className="table r-accounting-entries">
        <tbody>
        {
          _.map(this.props.entries, function(e){
            var profile = this.props.profiles.get(e.get('user').get('google_id')) || new NullProfile();
            return (
              <tr>
                <td><img src={profile.get('image')} /></td>
                <td>{e.get('amount')}</td>
                <td>{moment(e.get('created_at')).format('hh:mm DD/mm/YY')}</td>
              </tr>
            )
          }, this)
        }
        </tbody>
      </table>
    );
  }
});

module.exports = AccountingEntries;
