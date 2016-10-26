require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var models = require('./shared/models');

var roles = require('./lib/authorisation')


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
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: 'lnk23nkl23nkl23lnk23',
//   cookie: { maxAge: 2628000000 },
//   saveUninitialized: true,
//   resave: true
// }));
app.use(cookieSession({
  name: 'bubbles',
  keys: ['lnk23nkl23nkl23lnk23', '23f2323f3g23g2']
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false 
}));
// app.use(cookieParser('lnk23nkl23nkl23lnk23'));

// app.use(express.cookieSession({ secret: 'tobo!', maxAge: 360*5 }));



// Auth
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id)
    .then(function(user) {
      done(null, user);
  }, function(err){
    console.log('error ', err)
      done(null, err);
  });
});

// configure facebook for public access
passport.use('FacebookPublic', new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL_PUBLIC
  },
  function(accessToken, refreshToken, profile, done) {

  models.User
    .findOrCreate({
      where: {
        fb_id: profile.id
      }, 
      defaults: {
        fb_id: profile.id,
          displayName: profile.displayName,
          gender: profile.gender,
          accessToken: accessToken,
          refreshToken: refreshToken
      }
    })
    .spread(function(user, createdAt){
      if (!user) { return done('User not logged in'); }
      
      done(null, user);
    })

  }
));

// configure facebook
passport.use('FacebookAdmin', new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL_ADMIN
  },
  function(accessToken, refreshToken, profile, done) {

  models.User
    .findOrCreate({
      where: {
        fb_id: profile.id
      }, 
      defaults: {
        fb_id: profile.id,
          displayName: profile.displayName,
          gender: profile.gender,
          accessToken: accessToken,
          refreshToken: refreshToken
      }
    })
    .spread(function(user, createdAt){
      if (!user) { return done('User not logged in'); }

      // mark the user as admin
      // but don't approve
      user.is_admin = true;
      user.save()
        .then(function(){
          done(null, user);
        })
      
    })

  }
));

app.use(passport.initialize());
app.use(passport.session());









// Authorisation
app.use(roles.middleware());

// // admin users can access all pages
// roles.use(function (req) {

//   console.log('s'+req.user)  

//   if (req.user.is_admin) {

//     return true;
//   }
// });


// app.get('/', roles.can('access home page'), function (req, res) {
//   res.render('private');
// });
// app.get('/private', roles.can('access admin'), function (req, res) {
//   res.render('private');
// });
// app.get('/admin', roles.can('access admin page'), function (req, res) {
//   res.render('admin');
// });


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
