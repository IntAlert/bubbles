app.controller('PublicMygraphController', function ($scope, $window, $location, $anchorScroll, FriendshipService, D3GraphOptionsService) {

	$scope.ready = false;

	// Shared D3 Graph Options
	$scope.d3options = D3GraphOptionsService.get({
		panesPerWindow: 1,
		height:800
	})

	// One graph
	$scope.graph = {
		data: null,
		api: null,
		selectedScrape: null,
		selectedTags: null,
		booleanOperator: "AND"
	}

	// Get the latest scrape
	FriendshipService.getMostRecentScrape()
		.then(function(graph){
	        $scope.graph.api.updateWithData(graph)
		})

})