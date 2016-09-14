app.factory('FriendshipService', function() {

	var instance = {}

	instance.getByScrapeId = function(id) {
		return [
			{
				friend1_id:1,
				friend2_id:2
			},
			{
				friend1_id:2,
				friend2_id:3
			},
			{
				friend1_id:4,
				friend2_id:2
			},
			{
				friend1_id:1,
				friend2_id:4
			}
		]
	}

	return instance

})