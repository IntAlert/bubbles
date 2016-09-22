var models = require('../shared/models');


// For development/testing purposes
exports.handler = function( event, context ) {

	models.Tag.findAll()
  	.then(function(tags) {

		// respond
		console.dir( tags );

	});

}

