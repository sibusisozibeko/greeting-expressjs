const assert = require("assert");
const NamesGreeted = require("../greet");
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://coder:coder123@localhost:5432/greet_test";
const pool = new Pool({
  connectionString
});

let greeted = NamesGreeted(pool);

describe("The NamesGreeted function", function() {
  beforeEach(async function() {
    // clean the tables before each test run
    await pool.query("delete from greet;");
  });

  it("must show that a person is greeted in IsiXhosa ", async function() {
    var greeted = NamesGreeted(pool);
    let greeting = await greeted.greetedNames("English", "sbu");
    assert.equal("Hello, SBU", greeting);
  });

  it("must show that a person is greeted in English  ", async function() {
    // var greeted = NamesGreeted(pool);
    let greeting = await greeted.greetedNames("English", "leon");
    assert.equal("Hello, LEON", greeting);
  });

  // beforeEach(async function() {
  //   // clean the tables before each test run
  //   await pool.query("delete from greet;");
  // });

  it("must show that a person is greeted in Afrikaans ", async function() {
    // var greeted = NamesGreeted(pool);
    let greeting = await greeted.greetedNames("Afrikaans", "Rochelle");
    assert.equal("Hallo, ROCHELLE", greeting);
  });

  // beforeEach(async function() {
  //   // clean the tables before each test run
  //   await pool.query("delete from greet;");
  // });

  it("must count the number of names greeted and I expect three people to be greeted ", async function() {
    // let greeting = await greeted.greetedNames();
    await greeted.greetedNames("IsiXhosa", "Ace");
    await greeted.greetedNames("IsiXhosa", "Lilo");
    await greeted.greetedNames("IsiXhosa", "Vuyo");

    assert.equal(3, await greeted.countNames());
  });
  // beforeEach(async function() {
  //   // clean the tables before each test run
  //   await pool.query("delete from greet;");
  // });

  it("must count the number of names greeted and I expect three people to be greeted", async function() {
    //var greeted = NamesGreeted(pool);
    await greeted.greetedNames("English", "sbu");
    await greeted.greetedNames("English", "lilo");
    await greeted.greetedNames("English", "lilo");
    await greeted.greetedNames("English", "lilo");
    await greeted.greetedNames("English", "Mzwa");

    assert.equal(3, await greeted.countNames());
  });
  it("It must show the username counter", async function() {
    //var greeted = NamesGreeted(pool);
    await greeted.greetedNames("English", "SBU");
    await greeted.greetedNames("English", "SBU");
    await greeted.greetedNames("English", "SBU");
    let count = await greeted.usernamecounter("SBU");
    assert.equal(3, count.greet_count);
  });
  after(function() {
    pool.end();
  });
});
