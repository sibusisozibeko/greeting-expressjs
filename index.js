const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const NamesGreeted = require("./greet.js");
const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://coder:coder123@localhost:5432/greetings";

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

const Greet = NamesGreeted(pool);

let PORT = process.env.PORT || 9009;
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get("/", async function(req, res) {
  let count = await Greet.countNames();
  await Greet.returnName();
  await Greet.Greetfunctions("Sbu");
  res.render("home", { count });
});

app.post("/greetings", async function(req, res) {
  let textarea = req.body.myTextarea;
  let radio = req.body.radioz;
  let greet = await Greet.greetedNames(radio, textarea);
  let count = await Greet.countNames();

  res.render("home", {
    greet: greet,
    count: count
  });
});

app.get("/greeted", async function(req, res) {
  let greeted = await Greet.returnName();
  res.render("greetings", { greeted });
});

app.get("/reset", async function(req, res) {
  await Greet.clearBtn();
  res.redirect("/");
});

app.get("/greeted/:username", async function(req, res) {
  let greeted = await Greet.returnName();
  let message = await Greet.Greetfunctions(req.params.username);
  res.render("greetings", { greeted, message });
});

app.listen(PORT, function(err) {
  console.log("APP starting on port", PORT);
});
