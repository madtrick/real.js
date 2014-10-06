/** @jsx React.DOM */

var Factory             = require("rosie").Factory;
var TestUtils           = require('react/addons').addons.TestUtils;
var User                = require("../../models/user");
var AccountingEntry     = require("../../models/accounting-entry");
var AccountingEntries   = require("../accounting-entries.react");
var AccountingEntryItem = require("../accounting-entry-item.react");
var _                   = require("lodash");


var timeOffset = 10000;

Factory.define('user', User);
Factory.define('accountingEntry')
  .attr('created_at', function(){
    var createdAt = timeOffset + (+new Date());
    timeOffset += timeOffset;
    return createdAt;})
  .attr('user', function(){ return Factory.build('user'); });

var entries = _.times(10, function(){
  return new AccountingEntry(Factory.attributes('accountingEntry'));
});

var profiles = {get: function(){return Factory.build('user');}};


describe('AccountingEntries', function() {
  var accountingEntries, items;

  beforeEach(function() {
    // suffle the entries for the ordering test
    accountingEntries = TestUtils.renderIntoDocument(<AccountingEntries
      profiles={profiles}
      entries={_.shuffle(entries)}
      limit={5}
      handleClick={function(){}}/>);

    items = TestUtils.scryRenderedComponentsWithType(accountingEntries, AccountingEntryItem);
  });

  function mapCreatedAt(array) {
    return _.map(array, function(entry){return +entry.get('created_at');});
  }

  it('shows "limit" number of entries', function() {
    expect(items.length).toBe(5);
  });

  it('shows the older entries', function() {
    var itemsCreatedAt    = mapCreatedAt(_.map(items, function(i){return i.props.entry;}));
    var sortedByCreatedAt = mapCreatedAt(_.last(_.sortBy(entries, function(e){return +e.get('created_at')}), 5));

    expect(itemsCreatedAt).toEqual(sortedByCreatedAt);
  });
});
