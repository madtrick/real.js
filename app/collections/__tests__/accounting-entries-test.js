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
      accountingEntry_1 = accountingEntries.add({id: 0, date: moment().month(0)});
      accountingEntry_2 = accountingEntries.add({id: 1, date: moment().month(0)});
      accountingEntry_3 = accountingEntries.add({id: 2, date: moment().month(0)});
      accountingEntry_4 = accountingEntries.add({id: 3, date: moment().month(1)});
    });

    it('returns the entries created on the given month', function() {
      var matches = accountingEntries.findByMonth(0);

      expect(matches.length).toBe(3);
      expect(matches.indexOf(accountingEntry_1)).not.toEqual(-1);
      expect(matches.indexOf(accountingEntry_2)).not.toEqual(-1);
      expect(matches.indexOf(accountingEntry_3)).not.toEqual(-1);
    });
  });

  describe('findByTags', function() {
    var accountingEntry_1, accountingEntry_2;
    beforeEach(function() {
      accountingEntry_1 = accountingEntries.add({tags: ['bla', 'ble']});
      accountingEntry_2 = accountingEntries.add({tags: ['ble']});
      accountingEntries.add({tags: ['blu']});
    });

    it('returns all the entries which have some tag matching the given tags', function() {
      var matches = accountingEntries.findByTags(['bla', 'ble']);

      expect(matches.length).toBe(2);
      expect(matches.indexOf(accountingEntry_1)).not.toEqual(-1);
      expect(matches.indexOf(accountingEntry_2)).not.toEqual(-1);
    });
  });

  describe('expenseByMonth', function() {
    beforeEach(function() {
      accountingEntries.add({amount: -5, date: moment().month(0)});
      accountingEntries.add({amount: -5, date: moment().month(0)});
      accountingEntries.add({amount: 10, date: moment().month(0)});
      accountingEntries.add({amount: -5, date: moment().month(1)});
    });

    it('returns the sum of all the expenses in the given month', function() {
      expenses = accountingEntries.expenseByMonth(0);

      expect(expenses).toEqual(-10);
    });
  });

  describe('currentMonthAccumulatedExpense', function() {
    var currentMonth = (new Date()).getMonth();

    beforeEach(function() {
      spyOn(accountingEntries, 'expenseByMonth');
    });

    it('calls #expenseByMonth passing in the current month', function() {
      accountingEntries.currentMonthAccumulatedExpense();
      expect(accountingEntries.expenseByMonth).toHaveBeenCalledWith(currentMonth);
    });
  });
});
