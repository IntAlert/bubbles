app.factory('UserService', function($http) {

	var instance = {
		all: []
	}

	$http.get('/api/users/all')
		.then(function(response){
			var usersAppended = []

			instance.all = response.data.users
		})

	return instance

})