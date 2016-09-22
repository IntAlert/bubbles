var express = require('express');
var router = express.Router();
var models = require('../../shared/models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

module.exports = router;
