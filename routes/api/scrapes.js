var express = require('express');
var router = express.Router();
var models = require('../../models');


/* GET all scrapes. */
router.get('/all', function(req, res, next) {

  models.Scrape.findAll()
  	.then(function(scrapes) {

		// respond
		res.json({
			scrapes:scrapes
		})

	});

});

router.get('/:scrapeId', function(req, res, next) {

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
