var Reflux       = require('reflux');

var createAction = Reflux.createAction;

module.exports = {
  fetchUsers: createAction({asyncResult: true}),
  fetchProfiles: createAction({asyncResult: true}),
  fetchAccountingEntries: createAction(),
  fetchAccountingEntry: createAction(),
  createAccountingEntry: createAction(),
  updateAccountingEntry: createAction({asyncResult: true}),
  createRecurrentAccountingEntry: createAction({asyncResult: true}),
  updateRecurrentAccountingEntry: createAction({asyncResult: true}),
  addError: createAction()
};
