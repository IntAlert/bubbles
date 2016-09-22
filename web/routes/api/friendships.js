var express = require('express');
var router = express.Router();
var models = require('../../../shared/models');


/* GET all scrapes. */
router.get('/:scrapeId/all', function(req, res, next) {

  models.Friendship.findAll({
  	attributes: [], // we don't need anything from the join table
  	where: {
  		ScrapeId: req.params.scrapeId
  	},
  	include: [{
		model: models.User,
		attributes: ['id', 'fb_id', 'displayName', 'gender'],
		as: 'Friend1',
		include: [{
			attributes: ['id', 'name'],
			model: models.Tag
		}]
	}, {
		model: models.User,
		attributes: ['id', 'fb_id', 'displayName', 'gender'],
		as: 'Friend2',
		include: [{
			attributes: ['id', 'name'],
			model: models.Tag
		}]
	}]
  })
  	.then(function(friendships) {

		// respond
		res.json({
			friendships:friendships
		})

	});

});

router.get('/:scrapeId/graph', function(req, res, next) {

	models.Friendship.findAll({
	  	attributes: [], // we don't need anything from the join table
	  	where: {
	  		ScrapeId: req.params.scrapeId
	  	},
	  	include: [{
			model: models.User,
			attributes: ['id', 'fb_id', 'displayName', 'gender'],
			as: 'Friend1',
			include: [{
				attributes: ['id', 'name'],
				model: models.Tag
			}]
		}, {
			model: models.User,
			attributes: ['id', 'fb_id', 'displayName', 'gender'],
			as: 'Friend2',
			include: [{
				attributes: ['id', 'name'],
				model: models.Tag
			}]
		}]
	  })
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

		console.dir(friendshipIdIndexHelper)

		// respond
		res.json({
			nodes: nodes,
			// {"name":"Mme.Hucheloup","group":8}
			links: links
			// {"source":1,"target":0,"value":1},
		})

	});

});

module.exports = router;
