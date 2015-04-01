/** @jsx React.DOM */

var React               = require('react');
var TestUtils           = require('react/addons').addons.TestUtils;

var tagsFieldMock = React.createClass({
  value: function() {
    return ['tag1', 'tag2'];
  },
  render: function(){return <div></div>;}
});
var AccountingEntryForm = require('../accounting-entry-form.react');
AccountingEntryForm.__set__('TagsField', tagsFieldMock);

describe('AccountingEntryForm', function() {
  var accountingEntryFrom, spy;

  beforeEach(function() {
    spy = jasmine.createSpy();

    accountingEntryFrom = TestUtils.renderIntoDocument(
      <AccountingEntryForm onSubmit={spy}/>
    );
  });

  describe('on form submit', function() {
    var amountField;

    beforeEach(function() {
      var form;
      var baseForm;

      form        = TestUtils.findRenderedDOMComponentWithTag(accountingEntryFrom, 'form');
      amountField = accountingEntryFrom.refs.inputField;

      amountField.value('11');

      TestUtils.Simulate.submit(form);
    });

    it('executes the callback on the onSubmit prop', function(){
      expect(spy).toHaveBeenCalled();
    });

    it('resets the input field', function() {
      expect(amountField.value()).toEqual('');
    });

    describe('arguments to callback', function() {
      var args;
      beforeEach(function() {
        args = spy.calls.first().args[0];
      });

      it('passes the amount', function() {
        expect(args.amount).toBe(11);
      });

      it('passes the tags', function() {
        expect(args.tags).toEqual(['tag1', 'tag2']);
      });
    });
  });
});
