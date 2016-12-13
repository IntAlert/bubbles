app.factory('GraphFiltererService', function() {

	var instance = {}

	instance.byTags = function(graphData, selectedTags, booleanOperator) {

		angular.forEach(graphData.nodes, function(node) {

			// does the node contains any of the selected
			
			var selectedTagIds = selectedTags.map(function(e) { return e.id; })
			var nodeTagIds = node.Tags.map(function(e) { return e.id; })

			// get intersection of node tags and selected tags
			var intersection = selectedTagIds.filter(function(n) {
			    return nodeTagIds.indexOf(n) != -1;
			})
			
			if( booleanOperator == "OR" ) {

				// OR filtering
				var hasAtleastOneTag = intersection.length > 0

				node.filteredOutByTag = !hasAtleastOneTag
			} else {
				// AND filtering
				var hasAllSelectedTags = intersection.length == selectedTagIds.length

				node.filteredOutByTag = !hasAllSelectedTags
			}
			

		});

		return graphData

	}


	return instance

})