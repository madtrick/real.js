/** @jsx React.DOM */

var React        = require('react');
var Fluxxor      = require('fluxxor');
var FluxxorMixin = Fluxxor.FluxMixin(React);

var Real = React.createClass({

  mixins: [FluxxorMixin],

  render: function(){
    return (
      <div className="row">
        <div className="col-xs-12">
          <h1> Real in da house </h1>
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="amount">Amount</label>
              <input ref="inputField" type="number" className="form-control input-xlarge" id="amount" placeholder="Enter amount"/>
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
