var express = require('express');
var router = express.Router();
var models = require('../../shared/models');
var roles = require('../../config/authorisation')

/* GET all users. */
router.get('/all', roles.can('access admin app'), function(req, res, next) {

	models.User.findAll({
		attributes: ['id', 'fb_id', 'displayName', 'gender', 'is_admin', 'is_admin_approved'],
		include: [{
			model: models.Tag,
			attributes: ['id', 'name']
		}]
	})
  	.then(function(users) {

		// respond
		return res.json({
			users:users
		})

	});

});


router.post('/tag/:userId', roles.can('access admin app'), function(req, res, next) {

	models.User.findById(req.params.userId)
  	.then(function(user) {

  		if ( !user ) {
  			return res.status(404)
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

router.put('/updateAdminApproval/:userId', roles.can('access admin app'), function(req, res, next) {

	models.User.findById(req.params.userId)
  	.then(function(user) {

  		if ( !user ) {

  			return res.status(404)
  				.json("No user " + req.params.userId)
  		}

  		user.is_admin_approved = req.body.is_admin_approved
  		user.save()
	  		.then(function(){
	  			// respond
				res.json({
					user:user
				})
	  		})

	});

});

/* GET one user . */
router.get('/:userId', roles.can('access admin app'), function(req, res, next) {

	models.User.findOne({
		attributes: ['id', 'fb_id', 'displayName', 'gender', 'is_admin', 'is_admin_approved'],
		include: [{
			model: models.Tag,
			attributes: ['id', 'name']
		}]
	})
  	.then(function(user) {

		// respond
		return res.json({
			user:user
		})

	});

});


module.exports = router;
