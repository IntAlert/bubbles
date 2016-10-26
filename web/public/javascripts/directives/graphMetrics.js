app.directive('graphMetrics', function() {
  return {
    templateUrl: '/partials/directives/graphMetrics',
    scope: {
    	graphData: '='
    },
    controller: function($scope) {

    	$scope.user_count = 0;
    	$scope.interconnectedness = 0;
    	$scope.interconnectedness_percentage = 0

    	// check we have two arrays
    	$scope.$watch('graphData', function(){

    		var selectedLinkCount = 0
    		var selectedNodeCount = 0
    		var interconnectedness_percentage = 0

    		// is data ready?
    		if (!$scope.graphData || !Array.isArray($scope.graphData.nodes) || !Array.isArray($scope.graphData.links)) {
    			// abort for now
    			return
    		}

    		angular.forEach($scope.graphData.nodes, function(node) {

				// how many nodes shown
				if (!node.filteredOutByTag) {
					selectedNodeCount++
				}

			});

    		angular.forEach($scope.graphData.links, function(link) {

    			// how many links shown
        		if (!link.source.filteredOutByTag && !link.source.filteredOutByTag) {
					selectedLinkCount++
				}
            		
        	})

    		$scope.user_count = selectedNodeCount
        	$scope.interconnectedness = (selectedNodeCount == 0) ? 0 : (selectedLinkCount/selectedNodeCount)/2
        	$scope.interconnectedness_percentage = Math.round(100 * $scope.interconnectedness)

    	}, true)

    }
  }
});