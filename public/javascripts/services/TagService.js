app.factory('TagService', function($http) {

	var instance = {
		all: []
	}

	$http.get('/api/tags/all')
		.then(function(response){
			instance.all = response.data.tags
		})

	instance.create = function(tagName) {
		$http.post('/api/tags', {
			tagName: tagName
		})
		.then(function(response){
			return response.newTag
		}, function(){
			console.log("Tag already existed")
		})
	}

	instance.updateUserTags = function(userId, tagIds) {
		$http.post('/api/tags/user/' + userId, {
			tagIds: tagIds
		})
		.then(function(response){
			return response.tags
		}, function(){
			console.log("Some problem with tagging")
		})
	}

	instance.delete = function(tagId) {
		return $http.delete('/api/tags/' + tagId)
	}



	// delete

	return instance

})