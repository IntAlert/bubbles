require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'bubbles',
  keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2, process.env.COOKIE_KEY_3]
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false 
}));



// Authentication
var passport = require('./config/authentication')
app.use(passport.initialize());
app.use(passport.session());

// Authorisation
var roles = require('./config/authorisation')
app.use(roles.middleware());



// Load all routes
require('./config/routes')(app)


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
