var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET users listing. */
router.get('/', function(req, res, next) {

  models.Tag.findAll()
  	.then(function(tags) {

		// respond
		res.json({
			tags:tags
		})

	});

});

module.exports = router;
