var express = require('express');
var router = express.Router();
var models = require('../../shared/models');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const url = require('url');
var roles = require('../../lib/authorisation')




// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

// Public authentication
router.get('/facebook', passport.authenticate('FacebookPublic', { scope: 'user_friends' }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
  passport.authenticate('FacebookPublic', { 
  	failureRedirect: '/public/auth/facebook/failure', successRedirect: '/public/auth/facebook/success' 
  })
);

router.get('/facebook/failure', function(req, res, next) {
  res.render('public/auth/failure');
});

router.get('/facebook/success', roles.can('access public app'), function(req, res, next) {
  res.render('public/auth/success', {
  	user: req.user
  });
});

module.exports = router;