let assert = require("assert");
let NamesGreeted = require("../greet");
describe('The namesGreeted function', function(){

    it('must show that a person is greeted in IsiXhosa ', function(){
      var greeted = NamesGreeted();
      assert.equal("Molo, Sbu", greeted.greets("IsiXhosa", "Sbu"));
    });

    it('must show that a person is greeted in English  ', function(){
      var greeted = NamesGreeted();
      assert.equal("Hello, Leon", greeted.greets("English", "Leon"));
    });

    it('must show that a person is greeted in Afrikaans ', function(){
      var greeted = NamesGreeted();
      assert.equal("Hallo, Rochelle", greeted.greets("Afrikaans", "Rochelle"));
    });



        it('must count the number of names greeted and I expect three people to be greeted ', function(){
          var greeted = NamesGreeted();
          greeted.greets("IsiXhosa", "Sbu");
          greeted.greets("IsiXhosa", "Ace");
          greeted.greets("IsiXhosa", "Ace");
          greeted.greets("IsiXhosa", "Akhona");

          assert.equal(3,  greeted.counts());
        });
        it('must count the number of names greeted and I expect two people to be greeted', function(){
          var greeted = NamesGreeted();
          greeted.greets("English", "sbu");
          greeted.greets("English", "lilo");
          greeted.greets("English", "lilo");
          greeted.greets("English", "lilo");

          assert.equal(2,  greeted.counts());
        });

it('must test a factory function when it is called with a Map of names', function(){
        var namesGreeted = NamesGreeted(({"sbu" : 0, "lilo" : 0}));
        assert.deepEqual(({"sbu" : 0, "lilo" : 0}),  namesGreeted.getGreetingNames());
        });

        it('must test when two names are greeted and expect them to appear on the Map  ', function(){
        var namesGreeted = NamesGreeted(({"sbu" : 0, "lilo" : 0}))
        namesGreeted.greets("English", "Aya");
        namesGreeted.greets("English", "Siyo");
         assert.deepEqual(({ "sbu": 0, "lilo": 0, "Aya": 0, "Siyo": 0 }),  namesGreeted.getGreetingNames());
                });
});
