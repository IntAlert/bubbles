app.factory('UserService', function($http) {

	var instance = {
		all: []
	}

	$http.get('/api/users/all')
		.then(function(response){
			var usersAppended = []

			instance.all = response.data.users
		})



	instance.updateAdminApproval = function(id, is_admin_approved) {
		return $http.put('/api/users/updateAdminApproval/' + id, {
			is_admin_approved: is_admin_approved
		})
			.then(function(response){
				return response.tag
			})
	}

	return instance

})