var express = require('express');
var router = express.Router();
var models = require('../../shared/models');
var roles = require('../../config/authorisation')

/* GET all tags. */
router.get('/all', roles.can('access admin app'), function(req, res, next) {

  models.Tag.findAll()
  	.then(function(tags) {

		// respond
		res.json({
			tags:tags
		})

	});

});

// Overwrite all user tags according to POST tagIds
router.post('/user/:userId', roles.can('access admin app'), function(req, res, next) {

	models.User
	.findById(req.params.userId)
  	.then(function(user) {

  		// check user exists
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
					tags:tags
				})

			})

		})

	});

});


// Create a new tag
router.post('/', roles.can('access admin app'), function(req, res, next) {
	
	var tagName = String(req.body.tagName).trim()

	// check if tag already exists
	models.Tag
		.findOrCreate({
			where: {
				name: tagName
			}, 
			defaults: {
				name: tagName
			}
		})

		.spread(function(tag, created) {

			// respond with tag
			res.json({
				tag: tag
			})

		})
})

// Update a tag
router.put('/:tagId', roles.can('access admin app'), function(req, res, next) {
	
	var tagName = String(req.body.name).trim()

	// check if tag already exists
	models.Tag.findById(req.params.tagId)
		.then(function(tag){

			tag.name = tagName
			return tag.save()


		})

		.then(function(tag, created) {

			// respond with tag
			res.json({
				tag: tag
			})

		})
})

// Delete a tag
router.delete('/:tagId', roles.can('access admin app'), function(req, res, next) {

	models.Tag.findById(req.params.tagId)
	  	.then(function(tag) {

	  		if ( !tag ) {
	  			// return not found
				res.status(404)
					.json("No tag " + req.params.tagId)
	  		} else {
	  			tag.destroy()
		  			.then(function(){
		  				res.json({
							ok: true
						})
		  			})
	  		}

	  	})
})


module.exports = router;
