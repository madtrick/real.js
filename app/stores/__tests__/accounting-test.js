var AccountingEntries = require('../../collections/accounting_entries');
var AccountingEntry   = require('../../models/accounting-entry');
var AccountingStore   = require('../accounting');

var store = undefined;

describe("AccountingStore", function(){
  beforeEach(function() {
    store = new AccountingStore({collection: new AccountingEntries()});
  });
  describe('when idle', function() {
    describe('#state', function() {
      it('returns the constant States.IDLE', function() {

        expect(store.state()).toBe(AccountingStore.States.IDLE);
      });
    });
  });

  describe('#loadEntries', function() {
    it('loads the entries from the remote endpoint', function() {
      spyOn(store.collection, 'fetch');

      store.loadEntries();

      expect(store.collection.fetch).toHaveBeenCalled();
    });

    it('changes the state to States.LOADING_ENTRIES', function() {
      store.loadEntries();

      expect(store.state()).toBe(AccountingStore.States.LOADING_ENTRIES);
    });

    it('emits a change event', function() {
      spyOn(store, 'emit');

      store.loadEntries();

      expect(store.emit).toHaveBeenCalledWith('change');
    });
  });

  describe('#handleFailedCollectionFetch', function() {
    it('changes the state to States.IDLE', function() {
      store               = new AccountingStore({collection: new AccountingEntries()});
      store.fetchProfiles = jasmine.createSpy();
      store._state        = AccountingStore.States.LOADING_ENTRIES;

      store.handleFailedCollectionFetch();

      expect(store.state()).toBe(AccountingStore.States.IDLE);
    });
  });

  describe('#handleSuccessfulCollectionFetch', function() {
    it('changes the state to States.IDLE', function() {
      store               = new AccountingStore({collection: new AccountingEntries()});
      store.fetchProfiles = jasmine.createSpy();
      store._state        = AccountingStore.States.LOADING_ENTRIES;

      store.handleSuccessfulCollectionFetch();

      expect(store.state()).toBe(AccountingStore.States.IDLE);
    });
  });

  describe("#handleAction_createEntry", function(){

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
