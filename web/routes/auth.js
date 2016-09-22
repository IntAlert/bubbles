var express = require('express');
var router = express.Router();
var models = require('../../shared/models');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;


// configure facebook
passport.use(new FacebookStrategy({
    clientID: 533560176843182,
    clientSecret: '687fba6879bf346e6463417d43631751',
    callbackURL: "http://bubbles.international-alert.org/auth/facebook/callback"
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

  }
));


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook', { scope: 'user_friends' }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
  passport.authenticate('facebook', { 
  	failureRedirect: '/', successCallback: '/' 
  })
);

module.exports = router;