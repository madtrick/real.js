var moment = require('moment');

beforeEach(function() {
  jasmine.addMatchers({
    toEqualDate: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {
            pass: false,
          };

          if (actual.getFullYear() == expected.getFullYear() && actual.getMonth() == expected.getMonth() && actual.getDate()  == expected.getDate()){
             result.pass    = true;
             result.message = 'Expected ' + moment(actual).format('D/M/YYYY') + ' not to be ' + moment(expected).format('D/M/YYYY');
           } else {
             result.message = 'Expected ' + moment(actual).format('D/M/YYYY') + ' to be ' + moment(expected).format('D/M/YYYY');
           }

          return result;
        }
      };
    },
  });
});
