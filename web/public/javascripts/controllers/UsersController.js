app.controller('UsersController', function ($scope, $window, $location, $anchorScroll, TagService, UserService, $mdSidenav) {


	$scope.users = UserService
	$scope.tags = TagService


	$scope.userDetail = {}


	$scope.showUserDetail = function(user) {
		
		var userDetailSideNav = $mdSidenav('userDetail');

		userDetailSideNav.close()
			.then(function () {
				$scope.userDetail = user
				userDetailSideNav.open()
			});
	}

	$scope.createNewTag = function() {
		TagService.create($scope.newTagName)
	}


	// Update tagging
	// This updates the first time the sidenav is loaded
	// which is unnecessary.. but for now keeps code simpler

	$scope.$watch('userDetail.Tags', function(){

		if($scope.userDetail.id) {
			
			console.log('updating tags')

			var tagIds = $scope.userDetail.Tags.map(function(tag){return tag.id})

			TagService
				.updateUserTags($scope.userDetail.id, tagIds)
				.then(function(){
					console.log('update complete')
				})

		}



	}, true)

})