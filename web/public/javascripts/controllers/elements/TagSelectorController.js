app.controller('TagSelectorController', function ($scope, $window, $location, $anchorScroll, TagService, FriendshipService, ScrapeService) {



	// Tag Selector
	var selectedTags = [];
	$scope.availableTags = [{
		"id": 1,
		"name": "One"
	},{
		"id": 2,
		"name": "Two"
	}];


	$scope.isSelected = function(tag) {
		return -1 != selectedTags.map(function(e) { return e.id; }).indexOf(tag.id);
	}


	$scope.toggleTag = function(tag){

		// does tag already exist?
		var pos = selectedTags.map(function(e) { return e.id; }).indexOf(tag.id);

		if (pos == - 1)  {
			selectedTags.push(tag)
		} else {
			selectedTags.splice(pos)
		}
	}

})