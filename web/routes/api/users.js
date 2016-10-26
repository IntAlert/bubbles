var express = require('express');
var router = express.Router();
var models = require('../../shared/models');
var roles = require('../../lib/authorisation')

/* GET all users. */
router.get('/all', roles.can('access admin app'), function(req, res, next) {

	models.User.findAll({
		attributes: ['id', 'fb_id', 'displayName', 'gender'],
		include: [{
			model: models.Tag,
			attributes: ['id', 'name']
		}]
	})
  	.then(function(users) {

		// respond
		res.json({
			users:users
		})

	});

});

router.post('/tag/:userId', roles.can('access admin app'), function(req, res, next) {

	models.User.findById(req.params.userId)
  	.then(function(user) {

  		if ( !user ) {
  			res.status(404)
  				.json("No user " + req.params.userId)
  		}

  		// get tasks by id
  		var tagIds = req.body.tagIds;

  		models.Tag.findAll({
			where: {
				id: tagIds
			}
		}).then(function(tags){

			user.setTags(tags).then(function(){

				// respond
				res.json({
					tags:tagIds,
					user:user
				})

			})


		})

	});

});

module.exports = router;
