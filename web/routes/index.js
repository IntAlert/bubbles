var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('admin');
});


router.get('/tagSelector', function(req, res, next) {
  res.render('tagSelector');
});



module.exports = router;
