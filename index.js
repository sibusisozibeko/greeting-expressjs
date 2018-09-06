const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const NamesGreeted = require('./greet');

const app = express();
const Greet = NamesGreeted();

let PORT = process.env.PORT || 9009;
app.engine('handlebars', exphbs({
  defaultLayout: 'main',

}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


app.get('/', function(req, res) {
  let greet = Greet.greetedNames(Greet.returnLanguage(), Greet.returnName());

  let count = Greet.countNames();
  res.render('home', {count:count});
});

app.post('/greetings', function(req, res) {
 let textarea = req.body.myTextarea;
 let radio = req.body.radioz;
let greet = Greet.greetedNames(radio, textarea);
let count = Greet.countNames();

  
res.render('home',{
  greet:greet,
  count:count,

    
});
});

app.get('/reseting', function(req, res) {

Greet.clearBtn();
  
 res.redirect('/');
 
});



app.listen(PORT, function(err) {
  console.log("APP starting on port",PORT);
});
