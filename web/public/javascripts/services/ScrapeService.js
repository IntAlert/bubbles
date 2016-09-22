app.factory('ScrapeService', function($http) {

	var instance = {
		all: []
	}

	// load all
	$http.get('/api/scrapes/all')
		.then(function(response){
			instance.all = response.data.scrapes
			console.log(instance.all)
		})

	instance.getById = function(id) {
		return $http.get('/scrapes/' + id)
			.then(function(response){
				return response.tag
			})
	}

	return instance

})