/** @jsx React.DOM */
'use strict';

var React                  = require('react');
var Reflux                 = require('reflux');
var AccountingEntriesStore = require('../stores/accounting-entries');
var actions                = require('../actions');
var Graph                  = require('./graph.react');
var MonthlyAccTagsData     = require('./graphs/monthly-acc-tags-data');
var YearExpensesData       = require('./graphs/year-expenses-data');

var mixins = [
  Reflux.connect(AccountingEntriesStore, 'entries')
];

var Graphs = React.createClass({
  mixins: mixins,

  componentWillMount: function () {
    actions.fetchAccountingEntries();
  },

  render: function() {
    var yearExpensesData, tagsData;

    if (this.state.entries) {
      yearExpensesData = YearExpensesData.data(this.state.entries);
      tagsData         = MonthlyAccTagsData.data(
        this.state.entries,
        new Date().getMonth(),
        ['food', 'eating out']
      );
    }
    return (
      <div>
        {
          !this.state.entries ?
            <span>Loading <i className="fa fa-spinner fa-spin"></i></span>
          :
            <div>
              <Graph
                data={yearExpensesData}
                title="Accumulated per year"
              />
              <Graph
                data={tagsData}
                labels={['Food', 'Eating out', 'Total']}
                title="Monthly expenses in food and eating out"
              />
            </div>
        }
      </div>
    );
  }
});

module.exports = Graphs;
