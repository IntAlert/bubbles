app.controller('BubblesAdminController', function ($scope, $window, $location, $anchorScroll, TagService, FriendshipService, ScrapeService) {


	// Load form options
	$scope.tags = TagService;
	$scope.scrapes = ScrapeService

	// Query
	$scope.query = {
		scrape1: null,
		scrape2: null
	}



	// D3 Graphs
	$scope.graphs = {
		d3options: null,
		data: []
	}
	var color = d3.scale.category20()
    $scope.graphs.d3options = {
        chart: {
            type: 'forceDirectedGraph',
            height: 450,
            width: 200, //(function(){ return nv.utils.windowSize().width - 850 })(),
            margin:{top: 20, right: 20, bottom: 20, left: 20},
            color: function(d){
                return color(d.group)
            },
            nodeExtras: function(node) {
                node && node
                  .append("text")
                  .attr("dx", 8)
                  .attr("dy", ".35em")
                  .text(function(d) { return d.name })
                  .style('font-size', '10px');
            }
        }
    };



    

    // $scope.data = {
    //     links: [],
    //     nodes: []
    // }

	// Set graph data according to Scrape Date
	$scope.$watch('query.scrape1', function(){
		if ($scope.query.scrape1) {
			FriendshipService.getGraphByScrapeId($scope.query.scrape1.id).then(function(graphData){
		        $scope.graphs.data[0] = graphData
		    })	
		}
	})

	$scope.$watch('query.scrape2', function(){
		if ($scope.query.scrape2) {
			FriendshipService.getGraphByScrapeId($scope.query.scrape2.id).then(function(graphData){
		        $scope.graphs.data[1] = graphData
		    })	
		}
	})

})