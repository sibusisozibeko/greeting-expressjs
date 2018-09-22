const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const NamesGreeted = require("./greet.js");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
const routes = require("./routes");
const pg = require("pg");
const Pool = pg.Pool;
// initialise the flash middleware
app.use(flash());
// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL) {
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
const greetingRoute = routes(Greet);
let PORT = process.env.PORT || 9009;
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// initialise session middleware - flash-express depends on it
app.use(
  session({
    secret: "this is a text",
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get("/", greetingRoute.homePage);

app.post("/greetings", greetingRoute.greetcount);

app.get("/greeted", greetingRoute.showname);

app.get("/reset", greetingRoute.clearcountandnames);

app.get("/greeted/:username", greetingRoute.returnmessagedb);

app.get("/home", greetingRoute.returntohome);

app.listen(PORT, function(err) {
  console.log("APP starting on port", PORT);
});
