app.controller('BubblesAdminController', function ($scope, $window, $location, $anchorScroll, TagService, FriendshipService, ScrapeService) {

	$scope.tags = TagService;
	$scope.friendships = FriendshipService.getByScrapeId(1);
	$scope.scrapes = ScrapeService.all;


})