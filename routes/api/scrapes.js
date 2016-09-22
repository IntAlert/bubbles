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

// router.get('/:scrapeId/graph', function(req, res, next) {

//   models.Scrape.findById(req.params.scrapeId, {
// 	  	include: [{
// 			model: models.Friendship,
// 			attributes: ['friend1_id', 'friend2_id']
// 			include: [{
				
// 			}]
// 		}]
// 	})
// 	.then(function(scrape) {

// 		var links = [];

// 		for (var i = scrape.Friendships.length - 1; i >= 0; i--) {
// 			var friendship = scrape.Friendships[i]
// 			console.log(friendship)
// 			links.push({
// 				source: friendship.friend1_id,
// 				target: friendship.friend2_id,
// 				group:1
// 			})
// 		}

// 		// respond
// 		res.json({
// 			nodes: [],
// 			// {"name":"Mme.Hucheloup","group":8}
// 			links: links
// 			// {"source":1,"target":0,"value":1},
// 		})

// 	});

// });

module.exports = router;
