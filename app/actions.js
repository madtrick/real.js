var Reflux       = require('reflux');

var createAction = Reflux.createAction;

module.exports = {
  createRecurrentEntry : createAction({asyncResult: true}),
  addError             : createAction()
};
