app.controller('BubblesAdminController', function ($scope, $window, $location, $anchorScroll, TagService, FriendshipService, ScrapeService, D3GraphOptionsService) {

	$scope.ready = false;

	// Load form options
	$scope.tags = TagService;
	$scope.scrapes = ScrapeService

	// Shared D3 Graph Options
	$scope.d3options = D3GraphOptionsService

	// Two graphs
	$scope.graphs = [
		{
			data: null,
			api: null,
			selectedScrape: null,
			selectedTags: null
		},
		{
			data: null,
			api: null,
			selectedScrape: null,
			selectedTags: null
		}
	]

	// Wait for everything to be loaded
	$scope.$watch('[scrapes.all,tags.all]', function(){
		var ready = ($scope.scrapes.all.length > 0 && $scope.tags.all.length > 0)
		if (ready) $scope.ready = true
	}, true)

	// Once Everything is loaded
	$scope.$watch('ready', function(){
		if ($scope.ready) {
			console.log('ready')
			$scope.graphs[0].selectedScrape = $scope.scrapes.all[0] // first
			$scope.graphs[1].selectedScrape = $scope.scrapes.all[$scope.scrapes.all.length - 1] // last	
		}
	})
	

	// Update graph data on selectedTags change
    $scope.$watch('graphs[0].selectedTags', function(){
    	if ($scope.graphs[0].selectedScrape)
	    	$scope.graphs[0].data = filterGraphByTag($scope.graphs[0].data, $scope.graphs[0].selectedTags)
    }, true)

    $scope.$watch('graphs[1].selectedTags', function(){
    	if ($scope.graphs[1].selectedScrape)
	    	$scope.graphs[1].data = filterGraphByTag($scope.graphs[1].data, $scope.graphs[1].selectedTags)
    }, true)


	// Update graph data on selectedScrape Change
	$scope.$watch('graphs[0].selectedScrape', function(){
		if ($scope.graphs[0].selectedScrape) {
			FriendshipService.getGraphByScrapeId($scope.graphs[0].selectedScrape.id).then(function(graphData){
		        $scope.graphs[0].api.updateWithData(filterGraphByTag(graphData, $scope.graphs[0].selectedTags))
		    })	
		}
	})
	$scope.$watch('graphs[1].selectedScrape', function(){
		if ($scope.graphs[1].selectedScrape) {
			FriendshipService.getGraphByScrapeId($scope.graphs[1].selectedScrape.id).then(function(graphData){
		        $scope.graphs[1].api.updateWithData(filterGraphByTag(graphData, $scope.graphs[1].selectedTags))
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