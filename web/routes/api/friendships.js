var express = require('express');
var router = express.Router();
var models = require('../../shared/models');
var roles = require('../../lib/authorisation')

/* GET all friendships. */
router.get('/:scrapeId/all', roles.can('access admin app'), function(req, res, next) {

  models.Friendship.getAllByScrapeId(req.params.scrapeId, models)
  	.then(function(friendships) {

		// respond
		res.json({
			friendships:friendships
		})

	});

});

router.get('/:scrapeId/graph', roles.can('access admin app'), function(req, res, next) {

	models.Friendship.getAllByScrapeId(req.params.scrapeId, models)
	.then(function(friendships) {

		var links = [];
		var nodes = [];
		var friendshipIdIndexHelper = [];


		// build nodes and their indexes
		for (var i = friendships.length - 1; i >= 0; i--) {
			var friendship = friendships[i]

			// (no need to do or Friend2 as friendships are bidirectional)
			if (friendshipIdIndexHelper.indexOf(friendship.Friend1.fb_id) == -1) {
				nodes.push(friendship.Friend1)
				friendshipIdIndexHelper.push(friendship.Friend1.fb_id)
			}
		}

		// build links
		for (var i = friendships.length - 1; i >= 0; i--) {
			var friendship = friendships[i]

			var source_index = friendshipIdIndexHelper.indexOf(friendship.Friend1.fb_id);
			var target_index = friendshipIdIndexHelper.indexOf(friendship.Friend2.fb_id);			

			// add link
			links.push({
				source: source_index,
				target: target_index,
				group:1
			})
		}
		// respond
		res.json({
			nodes: nodes,
			links: links
		})

	});

});

// get missing friendships
// router.get('/:scrapeId/missing', roles.can('access admin app'), function(req, res, next) {

// 	models.Friendship.getAllByScrapeId(req.params.scrapeId, models)
// 	.then(function(friendships) {

// 		var links = [];
// 		var nodes = [];
// 		var friendshipIdIndexHelper = [];


// 		// build nodes and their indexes
// 		for (var i = friendships.length - 1; i >= 0; i--) {
// 			var friendship = friendships[i]

// 			// (no need to do or Friend2 as friendships are bidirectional)
// 			if (friendshipIdIndexHelper.indexOf(friendship.Friend1.fb_id) == -1) {
// 				nodes.push(friendship.Friend1)
// 				friendshipIdIndexHelper.push(friendship.Friend1.fb_id)
// 			}
// 		}

// 		// build links
// 		for (var i = friendships.length - 1; i >= 0; i--) {
// 			var friendship = friendships[i]

// 			var source_index = friendshipIdIndexHelper.indexOf(friendship.Friend1.fb_id);
// 			var target_index = friendshipIdIndexHelper.indexOf(friendship.Friend2.fb_id);			

// 			// add link
// 			links.push({
// 				source: source_index,
// 				target: target_index,
// 				group:1
// 			})
// 		}
// 		// respond
// 		res.json({
// 			nodes: nodes,
// 			links: links
// 		})

// 	});

// });

module.exports = router;
