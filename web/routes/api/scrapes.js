var express = require('express');
var router = express.Router();
var models = require('../../shared/models');
var roles = require('../../lib/authorisation')

/* GET all scrapes. */
router.get('/all', roles.can('access admin app'), function(req, res, next) {

  models.Scrape.findAll()
  	.then(function(scrapes) {

		// respond
		res.json({
			scrapes:scrapes
		})

	});

});

router.get('/:scrapeId', roles.can('access admin app'), function(req, res, next) {

  models.Scrape.findById(req.params.scrapeId, {
	  	include: [{
			model: models.Friendship,
			attributes: ['friend1_id', 'friend2_id']
		}]
	})
	.then(function(scrape) {

		// respond
		res.json({
			scrape:scrape
		})

	});

});

module.exports = router;
