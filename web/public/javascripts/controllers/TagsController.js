app.controller('TagsController', function ($scope, TagService, $mdDialog, $mdSidenav) {

	$scope.tags = TagService


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

	$scope.deleteTag = function($ev, tag) {
		
		TagService.delete(tag.id)
	}

})