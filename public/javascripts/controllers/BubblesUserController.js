app.controller('BubblesUserController', function ($scope, $window, $location, $anchorScroll, TagService, UserService) {


	$scope.users = UserService
	$scope.tags = TagService


	$scope.userDetail = {}


	$scope.showUser = function(user) {
		$scope.userDetail = user
	}

	$scope.compareTags = function(tag1, tag2){
		console.log(tag1)
        return tag1.id === tag2.id;
    };


})