const express = require('express');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('./strategies/local');

//Routes
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/markets');
const authRoute = require('./routes/auth');

require('./database');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieparser());

app.use(session({
  secret: "Essa é a mensagem secreta!",
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/groceries', groceriesRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/markets', marketsRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));
