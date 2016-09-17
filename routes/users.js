var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/all', function(req, res, next) {


	models.User.findAll({
		attributes: ['id', 'fb_id', 'displayName', 'gender'],
		include: [models.Tag]
	})
  	.then(function(users) {

		// respond
		res.json({
			users:users
		})

	});

});

module.exports = router;
