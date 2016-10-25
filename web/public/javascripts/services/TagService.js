app.factory('TagService', function($http) {

	var instance = {
		all: []
	}

	

	instance.getAll = function() {
		$http.get('/api/tags/all')
			.then(function(response){
				instance.all = response.data.tags
			})	
	}

	instance.create = function(tagName) {
		return $http.post('/api/tags', {
			tagName: tagName
		})
		.then(function(response){
			return instance.getAll()
		}, function(){
			console.log("Tag already existed?")
		})
	}

	instance.update = function(tag) {
		return $http.put('/api/tags/' + tag.id, {
			name: tag.name
		})
		.then(function(response){
			return instance.getAll()
		}, function(){
			console.log("Tag update did not work")
		})
	}

	instance.updateUserTags = function(userId, tagIds) {
		return $http.post('/api/tags/user/' + userId, {
			tagIds: tagIds
		})
	}

	instance.delete = function(tagId) {
		return $http.delete('/api/tags/' + tagId).then(instance.getAll)
	}

	instance.getAll()



	// delete

	return instance

})