app.factory('FriendshipService', function($http) {

	var instance = {}

	instance.getGraphByScrapeId = function(id) {
		return $http.get('/api/friendships/' + id + '/graph')
			.then(function(response){
				console.log(response)
				return response.data
			})
	}


	return instance

})