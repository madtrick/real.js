var moment            = require('moment');
var _                 = require('lodash');
var AccountingEntries = require('../accounting_entries');

describe('AccountingEntries', function() {
  var accountingEntries;

  beforeEach(function() {
    accountingEntries = new AccountingEntries();
  });

  describe('findByMonth', function() {
    var accountingEntry_1, accountingEntry_2, accountingEntry_3, accountingEntry_4;
    beforeEach(function() {
      accountingEntry_1 = accountingEntries.add({id: 0, created_at: moment().month(0)});
      accountingEntry_2 = accountingEntries.add({id: 1, created_at: moment().month(0)});
      accountingEntry_3 = accountingEntries.add({id: 2, created_at: moment().month(0)});
      accountingEntry_4 = accountingEntries.add({id: 3, created_at: moment().month(1)});
    });

    it('returns the entries created on the given month', function() {
      var matches = accountingEntries.findByMonth(0);

      expect(matches.length).toBe(3);
      expect(matches.indexOf(accountingEntry_1)).not.toEqual(-1);
      expect(matches.indexOf(accountingEntry_2)).not.toEqual(-1);
      expect(matches.indexOf(accountingEntry_3)).not.toEqual(-1);
    });
  });
});
