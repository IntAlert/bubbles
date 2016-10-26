var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var models = require('../shared/models');

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

module.exports = passport