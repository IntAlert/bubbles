require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');



// Public
var public_index = require('./routes/public/index');
var public_auth = require('./routes/public/auth');

// Admin
var admin_index = require('./routes/admin/index');
var admin_auth = require('./routes/admin/auth');

// API
var api_scrapes = require('./routes/api/scrapes');
var api_friendships = require('./routes/api/friendships');
var api_users = require('./routes/api/users');
var api_tags = require('./routes/api/tags');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Facebook Auth
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// PUBLIC routes
app.use('/', public_index);
app.use('/public/auth', public_auth);

// ADMIN routes
app.use('/admin', admin_index);
app.use('/admin/auth', admin_auth);

// API routes
app.use('/api/scrapes', api_scrapes);
app.use('/api/friendships', api_friendships);
app.use('/api/users', api_users);
app.use('/api/tags', api_tags);

// Jade Partials for directives
app.get('/partials/directives/:name', function (req, res) { 
  var name = req.params.name;
  res.render('partials/directives/' + name);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


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
