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

// anyone can access
router.get('/facebook', passport.authenticate('FacebookAdmin', { 
	scope: 'user_friends, user_managed_groups' 
}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

// anyone can access
router.get('/facebook/callback',
  passport.authenticate('FacebookAdmin', { 
  	failureRedirect: '/admin/auth/failure', successRedirect: '/admin/auth/facebook/success' 
  })
);

router.get('/facebook/failure', function(req, res, next) {
  res.render('admin/auth/failure');
});

router.get('/facebook/success', roles.can('access admin app'), function(req, res, next) {
  res.render('admin/auth/success');
});

module.exports = router;