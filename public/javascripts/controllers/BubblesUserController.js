app.controller('BubblesUserController', function ($scope, $window, $location, $anchorScroll, TagService, UserService, $mdSidenav) {


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

	$scope.updateTagging = function() {
		
	}

})