var Transformations = require('../transformations.js');

describe('Transformations', function() {
  var data;

  beforeEach(function() {
    data = [ {value: 10}, {value: 10}, {value: 30} ];
  });

  describe('#accumulate', function() {
    it('accumulates on each entry the previous expenses', function() {
      var transformation = new Transformations().accumulate(data);

      expect(transformation[0].value).toEqual(10);
      expect(transformation[1].value).toEqual(20);
      expect(transformation[2].value).toEqual(50);
    });
  });
});
