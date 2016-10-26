var express = require('express');
var router = express.Router();
var roles = require('../../lib/authorisation')

/* GET home page. */
// anyone can access
router.get('/', function(req, res, next) {
  res.render('admin/auth/login');
});

router.get('/compare', roles.can('access admin app'), function(req, res, next) {
  res.render('admin/compare');
});

router.get('/users', roles.can('access admin app'), function(req, res, next) {
  res.render('admin/users');
});

router.get('/tags', roles.can('access admin app'), function(req, res, next) {
  res.render('admin/tags');
});

module.exports = router;
