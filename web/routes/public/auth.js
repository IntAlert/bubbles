var express = require('express');
var router = express.Router();
var models = require('../../shared/models');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const url = require('url');


// configure facebook
passport.use(new FacebookStrategy({
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
		}).
		then(function(user){
			if (!user) { return done('User not logged in'); }
			
			done(null, user);
		})

  }
));


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

// Public authentication
router.get('/facebook', passport.authenticate('facebook', { scope: 'user_friends' }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
  passport.authenticate('facebook', { 
  	failureRedirect: '/public/auth/failure', successRedirect: '/public/auth/facebook/success' 
  })
);

router.get('/facebook/failure', function(req, res, next) {
  res.render('public/auth/failure');
});

router.get('/facebook/success', function(req, res, next) {
  res.render('public/auth/success');
});

module.exports = router;