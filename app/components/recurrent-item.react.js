/** @jsx React.DOM */
'use strict';

var React    = require('react/addons');
var TagsList = require('./helpers.react').TagsList;
var actions  = require('../actions');

var classSet = React.addons.classSet;

module.exports = React.createClass({
  render: function () {
    var recurrentAccountingEntry = this.props.item;
    var buttonClassName = classSet({
      'r-recurrent-item__btn btn btn-xs btn-primary': true,
      'disabled': !recurrentAccountingEntry.isOverdue()
    });

    return (
      <li className="r-recurrent-accounting-entry-item clearfix">
        <div className="r-recurrent-item__amount">
          {recurrentAccountingEntry.get('amount')}
        </div>
        <TagsList
          className="r-recurrent-item__tags"
          tags={recurrentAccountingEntry.get('tags')}
        />
        <a
          className={buttonClassName}
          href="#"
          onClick={this.createAccountingEntry}
          role="button" >
          Input now
        </a>
        <div className="r-recurrent-item__overdue">
          {
            recurrentAccountingEntry.isOverdue() &&
            <span className="label label-danger">Overdue</span>
          }
        </div>
      </li>
    );
  },

  createAccountingEntry: function () {
    var self                     = this;
    var recurrentAccountingEntry = this.props.item;
    var amount                   = recurrentAccountingEntry.get('amount');
    var tags                     = recurrentAccountingEntry.get('tags');
    var date                     = new Date();

    actions.createAccountingEntry({
      amount: amount,
      tags: tags,
      date: date
    })
    .then( function () {
      // TODO: Do not update all properties
      /*eslint camelcase: [2, {properties: "never"}]*/
      actions.updateRecurrentAccountingEntry({
        entry_id: self.props.item,
        last_run: date,
        period: self.props.item.get('period'),
        amount: amount,
        tags: tags
      });

    });
    return false;
  }
});
