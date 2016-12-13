app.controller('AdminGraphController', function ($scope, $window, $location, $anchorScroll, TagService, FriendshipService, ScrapeService, D3GraphOptionsService, GraphFiltererService) {

	$scope.ready = false;

	// Load form options
	$scope.tags = TagService;
	$scope.scrapes = ScrapeService

	// Shared D3 Graph Options
	$scope.d3options = D3GraphOptionsService.get({
		panesPerWindow: 1
	})

	// One graph
	$scope.graph = {
		data: null,
		api: null,
		selectedScrape: null,
		selectedTags: null,
		booleanOperator: "AND"
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
	    	$scope.graph.data = GraphFiltererService.byTags($scope.graph.data, $scope.graph.selectedTags, $scope.graph.booleanOperator)
    }, true)

    // Update graph data on boolean change
    $scope.$watch('graph.booleanOperator', function(){
    	if ($scope.graph.selectedScrape)
	    	$scope.graph.data = GraphFiltererService.byTags($scope.graph.data, $scope.graph.selectedTags, $scope.graph.booleanOperator)
    }, true)

	// Update graph data on selectedScrape Change
	$scope.$watch('graph.selectedScrape', function(){
		if ($scope.graph.selectedScrape) {
			FriendshipService.getGraphByScrapeId($scope.graph.selectedScrape.id).then(function(graphData){
				var graphData = GraphFiltererService.byTags(graphData, $scope.graph.selectedTags, $scope.graph.booleanOperator)
		        $scope.graph.api.updateWithData(graphData)
		    })	
		}
	})


	









})