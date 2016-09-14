app.factory('UserService', function() {

	var instance = {
		all: [
			{
				id: 1,
				displayName:'bob'
			},

			{
				id: 2,
				displayName:'bob2'
			},

			{
				id: 3,
				displayName:'bob3'
			},

			{
				id: 4,
				displayName:'bob4'
			}
		]
	}

	return instance

})