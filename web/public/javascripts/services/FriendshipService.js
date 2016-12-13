app.factory('FriendshipService', function($http) {

	var instance = {}

	instance.getGraphByScrapeId = function(id) {
		return $http.get('/api/friendships/' + id + '/graph')
			.then(function(response){
				return response.data
			})
	}

	instance.getMostRecentScrape = function(id) {
		return $http.get('/api/friendships/mostrecent/graph')
			.then(function(response){
				return response.data
			})
	}


	return instance

})