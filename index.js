const express = require('express'), 
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  cookieSession = require('cookie-session'),
  keys = require('./config/keys'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
app.use(methodOverride('_method'));
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize());
app.use(passport.session());


require('./models/places');
require('./models/user');

app.get('/', (req, res)=>{
  res.send('Hello');
});


require('./routes/placesRoutes')(app);  
require('./routes/authRoutes')(app);

const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

const passportConfig = require('./services/passport');

const PORT = process.env.PORT || 4321;

if(process.env.NODE_ENV === 'production'){
  // Express will serve production assets like main.css etc.
  app.use(express.static('client/build'));

  // Express will serve index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, err=>{
  err ? console.log(err) : console.log('Connected')
});