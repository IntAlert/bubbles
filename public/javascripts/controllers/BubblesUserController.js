app.controller('BubblesUserController', function ($scope, $window, $location, $anchorScroll, TagService, UserService) {


	$scope.users = UserService


	$scope.userDetail = {}


	$scope.showUser = function(user) {
		$scope.userDetail = user
	}

})