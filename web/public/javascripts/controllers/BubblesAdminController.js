app.controller('BubblesAdminController', function ($scope, $window, $location, $anchorScroll, TagService, FriendshipService, ScrapeService) {


	// Load form options
	$scope.tags = TagService;
	$scope.scrapes = ScrapeService

	// Query
	$scope.query = {
		scrape1: null,
		scrape2: null
	}

	// Tags
	$scope.scrape1Tags = []
	$scope.scrape2Tags = []

	$scope.api = null;




	$scope.$watch('scrapes.all', function(){
		$scope.query.scrape1 = $scope.scrapes.all[0]
		$scope.query.scrape2 = $scope.scrapes.all[$scope.scrapes.all.length - 1]
	})


















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
            width: 350, //(function(){ return nv.utils.windowSize().width - 850 })(),
            margin:{top: 20, right: 20, bottom: 20, left: 20},
            color: function(d){
                return color(d.group)
            },
            charge: -1000,
            linkDist: 120,
            linkExtras: function(links) {
            	
            	links[0].forEach(function(link){

            		if (link.__data__.source.filteredOutByTag || link.__data__.target.filteredOutByTag) {
            			link.style.opacity = 0	
            		} else {
            			link.style.opacity = 1
            		}
            		
            	})
            },
            nodeExtras: function(node) {
            	
            	node.style('opacity', function(d){
            		if(d.filteredOutByTag) return '0.2';
            		else return '1';
            	})
            	

                node
                  .append("text")
	                  .attr("dx", 8)
	                  .attr("dy", ".35em")
	                  .text(function(d) { return d.name })
                  .style('font-size', '17px');


				// Append images
				node.append("svg:g")
			      .attr("class", "node")
			      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			 
			  // Append a circle
				node.append("svg:circle")
			      .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
			      .style("fill", "#eee");
			 
			   
			  // Append profile image
				node.append("svg:image")
			        .attr("xlink:href",  function(d) { 
			        	var profile_url = "http://graph.facebook.com/" + d.fb_id + "/picture?type=square"
			        	return profile_url;
			        })
			        .attr("x", function(d) { return -25;})
			        .attr("y", function(d) { return -25;})
			        .attr("height",40)
			        .attr("width", 40);
            }
        }
    };


    $scope.$watch('scrape1Tags', function(){
    	if ($scope.query.scrape1)
	    	$scope.graphs.data[0] = filterGraphByTag($scope.graphs.data[0], $scope.scrape1Tags)
    }, true)

    

    // $scope.data = {
    //     links: [],
    //     nodes: []
    // }

	// Set graph data according to Scrape Date
	$scope.$watch('query.scrape1', function(){
		if ($scope.query.scrape1) {
			FriendshipService.getGraphByScrapeId($scope.query.scrape1.id).then(function(graphData){
		        // $scope.graphs.data[0] = graphData
		        $scope.api.updateWithData(graphData)
		    })	
		}

		console.log($scope.api)
	})

	$scope.$watch('query.scrape2', function(){
		if ($scope.query.scrape2) {
			FriendshipService.getGraphByScrapeId($scope.query.scrape2.id).then(function(graphData){
		        $scope.graphs.data[1] = graphData
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

			console.log(selectedTagIds)

			var hasAtleastOneTag = intersection.length > 0

			node.filteredOutByTag = !hasAtleastOneTag

		});

		return graphData

	}









})