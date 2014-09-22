var AccountingEntries = require('../../collections/accounting_entries');
var AccountingEntry   = require('../../models/accounting-entry');
var AccountingStore   = require('../accounting');

var store = undefined;

describe("AccountingStore", function(){
  describe("#handleAction_createEntry", function(){

    beforeEach(function(){
      store = new AccountingStore({collection: new AccountingEntries()});
    });

    it("creates a new model", function(){
      var numberOfEntries = store.collection.size();

      store.handleAction_createEntry({amount: 4});

      expect(store.collection.size()).toBe(numberOfEntries + 1);
    });

    it('creates a new model with the expected amount', function(){
      spyOn(store.collection, 'add').andCallThrough();

      store.handleAction_createEntry({amount: 10});

      expect(store.collection.add).toHaveBeenCalledWith({amount: 10});
    });

    describe('saving to the backend', function(){
      describe('on success', function(){

        beforeEach(function(){
          AccountingEntry.prototype.save = function(options){
            options.success(this);
          };
        });

        it('emits a change event', function(){
          spyOn(store, 'emit');

          store.handleAction_createEntry({amount: 10});

          expect(store.emit).toHaveBeenCalledWith('change');
        });
      });

      describe('on failure', function(){

        beforeEach(function(){
          AccountingEntry.prototype.save = function(options){
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
