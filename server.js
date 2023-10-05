const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const connectToDB = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.use(session({ secret: 'anything' }));

connectToDB();

if(process.env.NODE_ENV !== 'production') {
  app.use(
      cors({
        origin: ['http://localhost:3000'],
        credentials: true,
      })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session
({
  secret: 'xyz567',
  store: MongoStore.create(mongoose.connection),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
}));

console.log('Session middleware initialized');

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', require('./routes/ads.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

module.exports = app;