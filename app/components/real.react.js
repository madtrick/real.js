/** @jsx React.DOM */

var React           = require('react');
var Fluxxor         = require('fluxxor');
var FluxxorMixin    = Fluxxor.FluxMixin(React);
var _               = require('lodash');
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var moment          = require('moment');
var NullProfile     = require('../models/null-profile');

var Real = React.createClass({

  mixins: [FluxxorMixin, StoreWatchMixin("AccountingStore", "ProfilesStore")],

  getStateFromFlux: function() {
    return {
      entries: this.getFlux().store("AccountingStore").entries(),
      profiles: this.getFlux().store("ProfilesStore").profiles()
    };
  },

  componentDidMount: function() {
    this.taggle = new Taggle('tags');
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-xs-12">
          {
            this.state && _.map(this.state.entries, function(e){
              var profile = this.state.profiles.get(e.get('user').get('google_id')) || new NullProfile();
              return (
                <div>
                  <div>{e.get('amount')} -- {moment(e.get('created_at')).format('HH:mm DD/MM/YY')} -- {profile.get('image')}</div>
                </div>
              )
            }, this)
          }
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="amount">Amount</label>
              <input ref="inputField" type="number" className="form-control input-xlarge" id="amount" placeholder="Enter amount" required="required"/>
              <div className="clearfix" id="tags"></div>
            </div>
            <button type="submit" className="btn btn-xlarge btn-danger">Expense</button>
          </form>
        </div>
      </div>
    );
  },

  handleSubmit: function(e){
    var amount = this.refs.inputField.getDOMNode().value;

    this.getFlux().actions.createEntry({amount: amount, tag_list: this.taggle.getTagValues()});
    return false;
  }

});

module.exports = Real;
