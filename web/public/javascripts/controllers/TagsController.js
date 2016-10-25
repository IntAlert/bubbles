app.controller('TagsController', function ($scope, TagService, $mdDialog, $mdSidenav, $timeout) {

	$scope.tags = TagService

	$scope.tagDetail = {};
	


	// UPDATE
	$scope.showEditTagForm = function(tag) {

		$scope.tagDetail = tag

		$mdSidenav('editTagForm').open()

	}

	$scope.update = function() {
		TagService.update($scope.tagDetail)
	}



	// CREATE
	$scope.showCreateTagForm = function() {
		
		$mdSidenav('createTagForm').open()
	}

	$scope.createNewTag = function() {
		TagService.create($scope.newTagName)
			.then(function(){
				$scope.newTagName = ''
				$mdSidenav('createTagForm').close()
			})
	}


	// DELETE
	$scope.deleteTag = function() {
		
		TagService.delete($scope.tagDetail.id)
			.then(function(){
				$mdSidenav('editTagForm').close()
			})
	}

})