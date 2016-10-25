app.controller('UsersController', function ($scope, $window, $location, $anchorScroll, TagService, UserService, $mdSidenav) {


	$scope.users = UserService
	$scope.tags = TagService


	$scope.userDetail = {}


	// USER LISTING
	$scope.query = {}

	$scope.filterUser = function(user) {
		return function(user) {

			if( $scope.query.displayName && !checkNameMatch(user, $scope.query.displayName) ) {
				return false
			}

			if( !checkTagMatch(user, $scope.query.selectedTags) ) {
				return false;
			}

			return true;
		};
	}

	var checkNameMatch = function(user, search) {
		return (user.displayName
				.toLowerCase()
				.indexOf(search.toLowerCase()) > -1)
	}

	var checkTagMatch = function(user, selectedTags) {

		// if no tags selected, return true
		if (selectedTags.length == 0) return true

		// does the user contains any of the selected
		
		var selectedTagIds = selectedTags.map(function(e) { return e.id; })
		var userTagIds = user.Tags.map(function(e) { return e.id; })
		var intersection = selectedTagIds.filter(function(n) {
		    return userTagIds.indexOf(n) != -1;
		})

		var hasAtleastOneTag = intersection.length > 0

		return hasAtleastOneTag

	}





	// USER EDITING

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
			.then(function(){
				$scope.newTagName = ''
			})
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