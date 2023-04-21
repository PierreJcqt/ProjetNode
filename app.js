const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const routes = require('./routes/user');
const app = express();
const cors = require('cors');
const flash = require('connect-flash');
const { dashboard } = require('./controllers/pageController');
const pug = require('pug');


require('dotenv').config();


app.use(cors());
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(flash());
  

  app.use((req, res, next) => {
    res.locals.flash_success = req.flash('success');
    next();
  });
  app.use('/', routes);

  app.use((req, res, next) => {
    res.locals.flash_error = req.flash('error');
    next();
  });
  app.use('/', routes);


function dashAuthenticated(req, res, next) {
    if (req.session.user) {
      return next();
    }
    res.redirect('/login');
  }
  
  
  app.get('/dashboard', dashAuthenticated, dashboard, (req, res) => {
    res.render('dashboard', { user: req.session.user });
  });


app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ADMIN_USERNAME}:${process.env.DB_ADMIN_PASSWORD}@${process.env.DB_ADMIN_CLUSTER}.htixmmt.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.status(404).send("Ressources introuvables !");
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong !');
});

module.exports = app;