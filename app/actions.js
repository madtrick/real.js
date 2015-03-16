var Reflux = require('reflux');

module.exports = Reflux.createActions({
  'createEntry'          : undefined,
  'updateEntry'          : undefined,
  'fetchProfiles'        : undefined,
  'createRecurrentEntry' : {asyncResult: true}
});
