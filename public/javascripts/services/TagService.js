app.factory('TagService', function($http) {

	var instance = {
		all: []
	}

	$http.get('/tags')
		.then(function(response){
			instance.all = response.data.tags
		})

	return instance

})