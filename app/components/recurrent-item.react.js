/** @jsx React.DOM */

var React    = require('react/addons');
var classSet = React.addons.classSet;
var TagsList = require('./helpers.react').TagsList;

var RecurrentItem = React.createClass({
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
          role="button">Input now</a>
        <div className="r-recurrent-item__overdue">
          {
            (recurrentAccountingEntry.isOverdue()) &&
            <span className="label label-danger">Overdue</span>
          }
        </div>
      </li>
    );
  }
});

module.exports = RecurrentItem;
