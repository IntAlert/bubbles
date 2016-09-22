app.controller('BubblesAdminController', function ($scope, $window, $location, $anchorScroll, TagService, FriendshipService, ScrapeService) {


	// Load form options
	$scope.tags = TagService;
	$scope.scrapes = ScrapeService

	// Query
	$scope.query = {
		scrape1: null,
		scrape2: null
	}

	// Graph data
	// $scope.friendships = FriendshipService.getByScrapeId(1);
	// Load Graph data on change
	$scope.$watch('query.scrape1', function(){
		console.log($scope.query.scrape1)
	})

})