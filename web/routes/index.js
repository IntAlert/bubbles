var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/tagSelector', function(req, res, next) {
  res.render('tagSelector');
});



module.exports = router;
