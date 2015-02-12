/** @jsx React.DOM */

var React                      = require('react');
var Link                       = require('rrouter').Link;
var MainLayout                 = require('./layouts/main.react');
var RecurrentItem              = require('./recurrent-item.react');
var RecurrentAccountingEntries = require('../collections/recurrent-accounting-entries');

var FAKE_DATA = [
  {
    amount: -1000,
    tags: [{name: 'flat'}],
    period: '1:month:1',
    'last-run': new Date()
},
{
  amount: -23,
  tags: [{name: 'telephone'}, {name: 'home'}],
  period: '1:month:1',
}
];

var recurrentAccountingEntries = new RecurrentAccountingEntries(FAKE_DATA);

var ReccurringAccountinEntries = React.createClass({
  render: function() {
    return (
      <MainLayout>
        <Link
          className="btn btn-default"
          to="/recurrent-accounting-entry-new"
        >+ Recurrent entry</Link>
        <ul className="r-recurring-accounting-entries">
          {
            recurrentAccountingEntries.map(function (rae) {
              return <RecurrentItem item={rae}/>;
            })
          }
        </ul>
      </MainLayout>
    );
  }
});
module.exports = ReccurringAccountinEntries;
