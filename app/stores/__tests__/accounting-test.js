var AccountingEntries = require('../../collections/accounting_entries');
var AccountingEntry   = require('../../models/accounting-entry');
var AccountingStore   = require('../accounting');

var store = undefined;

describe("AccountingStore", function(){
  describe("#handleAction_createEntry", function(){

    beforeEach(function(){
      store = new AccountingStore({collection: new AccountingEntries()});
    });

    it('instantiates a new model', function() {
      var payload = {amount: 4, tag_list: ['a', 'b']};
      spyOn(store.collection, 'model').andReturn({save: function(){}});

      store.handleAction_createEntry(payload);

      expect(store.collection.model).toHaveBeenCalledWith(payload);
    });

    describe('saving to the backend', function(){
      describe('on success', function(){

        beforeEach(function(){
          AccountingEntry.prototype.save = function(attributes, options){
            options.success(this);
          };
        });

        it('reloads the collection', function(){
          spyOn(store.collection, 'fetch');

          store.handleAction_createEntry({amount: 10});

          expect(store.collection.fetch).toHaveBeenCalled();
        });
      });

      describe('on failure', function(){

        beforeEach(function(){
          AccountingEntry.prototype.save = function(attributes, options){
            options.error(this);
          };
        });

        it('removes the entry from the collection', function(){
          var numberOfEntries = store.collection.size();

          store.handleAction_createEntry({amount: 10});

          expect(store.collection.size()).toBe(numberOfEntries);
        });
      });
    });
  });

});
