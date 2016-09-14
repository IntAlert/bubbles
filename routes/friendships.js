var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/get/:scrapeId', function(req, res, next) {

	var friends = []; // TODO: this needs to come from database

	models.Friendship.findAll({
		where: { 
			scrape_id: req.params.scrapeId
		}
	  }).then(function(friendships) {

			// respond
			res.json({
				friendships:friendships,
				friends: friends
			})

	});

});

module.exports = router;
