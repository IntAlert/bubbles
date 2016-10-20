var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/compare', function(req, res, next) {
  res.render('admin/compare');
});

router.get('/users', function(req, res, next) {
  res.render('admin/users');
});

router.get('/tags', function(req, res, next) {
  res.render('admin/tags');
});

module.exports = router;
