/** @jsx React.DOM */

var React           = require('react');
var Fluxxor         = require('fluxxor');
var FluxxorMixin    = Fluxxor.FluxMixin(React);
var _               = require('lodash');
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var moment          = require('moment');

var Real = React.createClass({

  mixins: [FluxxorMixin, StoreWatchMixin("AccountingStore")],

  getStateFromFlux: function() {
    return {
      entries: this.getFlux().store("AccountingStore").entries()
    };
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-xs-12">
          {
            this.state && _.map(this.state.entries, function(e){
              return (
                <div>
                  <div>{e.get('amount')} -- {moment(e.get('created_at')).format('HH:mm DD/MM/YY')}</div>
                </div>
              )
            })
          }
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="amount">Amount</label>
              <input ref="inputField" type="number" className="form-control input-xlarge" id="amount" placeholder="Enter amount" required="required"/>
            </div>
            <button type="submit" className="btn btn-xlarge btn-danger">Expense</button>
          </form>
        </div>
      </div>
    );
  },

  handleSubmit: function(e){
    var amount = this.refs.inputField.getDOMNode().value;

    this.getFlux().actions.createEntry({amount: amount});
    return false;
  }

});

module.exports = Real;
