/** @jsx React.DOM */

var React        = require('react/addons');
var TagsList     = require('./helpers.react').TagsList;

var classSet     = React.addons.classSet;

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
          onClick={this.createAccountingEntry}
          href="#"
          role="button" >
          Input now
        </a>
        <div className="r-recurrent-item__overdue">
          {
            (recurrentAccountingEntry.isOverdue()) &&
            <span className="label label-danger">Overdue</span>
          }
        </div>
      </li>
    );
  },

  createAccountingEntry: function () {
    //var recurrentAccountingEntry = this.props.item;
    //var amount                   = recurrentAccountingEntry.get('amount');
    //var tag_list                 = recurrentAccountingEntry.get('tags').map(function(t) {return t.name;});
    //var date                     = new Date();

    //var ret=    this.getFlux().actions.createEntry({amount: amount, tag_list: tag_list, date: date});
    //console.log(ret);
    //return false;
  }
});

module.exports = RecurrentItem;
