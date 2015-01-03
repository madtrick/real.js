var Generators = require('../generators');
var moment     = require('moment');

describe('Generators', function() {
  describe('everyDay', function() {
    it('generates one element for every day between its from and to parameters', function() {
      var from     = new Date();
      var to       = moment().add(3, 'days').toDate();
      var elements = new Generators().everyDay(from, to, 1);

      expect(elements.length).toEqual(3);
      expect(elements[0].value).toEqual(1);
      expect(elements[0].date).toEqualDate(moment(from).add(1, 'days').toDate());
    });
  });
});
