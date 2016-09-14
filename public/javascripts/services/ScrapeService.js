app.factory('ScrapeService', function() {

	var instance = {
		all: [
			{
				id:1,
				updatedAt: new Date()
			},
			{
				id:2,
				updatedAt: new Date()
			},
			{
				id:3,
				updatedAt: new Date()
			},
			{
				id:4,
				updatedAt: new Date()
			}
		]
	}

	return instance

})