app.factory('ScrapeService', function($http) {

	var instance = {
		all: []
	}

	// load all
	$http.get('/scrapes')
		.then(function(response){
			instance.all = response.data.tags
		})

	instance.getById = function(id) {
		return $http.get('/scrapes/' + id)
			.then(function(response){
				return response.tag
			})
	}

	return instance

})