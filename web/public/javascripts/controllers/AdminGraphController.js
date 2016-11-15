app.controller('AdminGraphController', function ($scope, $window, $location, $anchorScroll, TagService, FriendshipService, ScrapeService, D3GraphOptionsService) {

	$scope.ready = false;

	// Load form options
	$scope.tags = TagService;
	$scope.scrapes = ScrapeService

	// Shared D3 Graph Options
	$scope.d3options = D3GraphOptionsService.get({
		panesPerWindow: 1
	})

	// Two graphs
	$scope.graph = {
		data: null,
		api: null,
		selectedScrape: null,
		selectedTags: null
	}

	// Wait for everything to be loaded
	$scope.$watch('[scrapes.all,tags.all]', function(){
		var ready = ($scope.scrapes.all.length > 0 && $scope.tags.all.length > 0)
		if (ready) $scope.ready = true
	}, true)

	// Once Everything is loaded
	$scope.$watch('ready', function(){
		if ($scope.ready) {
			$scope.graph.selectedScrape = $scope.scrapes.all[$scope.scrapes.all.length - 1] // last	
		}
	})
	

	// Update graph data on selectedTags change
    $scope.$watch('graph.selectedTags', function(){
    	if ($scope.graph.selectedScrape)
	    	$scope.graph.data = filterGraphByTag($scope.graph.data, $scope.graph.selectedTags)
    }, true)

	// Update graph data on selectedScrape Change
	$scope.$watch('graph.selectedScrape', function(){
		if ($scope.graph.selectedScrape) {
			FriendshipService.getGraphByScrapeId($scope.graph.selectedScrape.id).then(function(graphData){
		        $scope.graph.api.updateWithData(filterGraphByTag(graphData, $scope.graph.selectedTags))
		    })	
		}
	})


	var filterGraphByTag = function(graphData, selectedTags) {


		angular.forEach(graphData.nodes, function(node) {

			// does the node contains any of the selected
			
			var selectedTagIds = selectedTags.map(function(e) { return e.id; })
			var nodeTagIds = node.Tags.map(function(e) { return e.id; })
			var intersection = selectedTagIds.filter(function(n) {
			    return nodeTagIds.indexOf(n) != -1;
			})

			var hasAtleastOneTag = intersection.length > 0

			node.filteredOutByTag = !hasAtleastOneTag

		});

		return graphData

	}









})