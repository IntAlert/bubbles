app.directive('tagSelector', function() {
  return {
    templateUrl: '/partials/directives/tagSelector',
    scope: {
    	availableTags: '=',
    	selectedTags: '='
    },
    controller: function($scope) {

    	// check we have two arrays
    	if (!Array.isArray($scope.availableTags)) {
    		console.log('availableTags not an array, no tags available')
    		$scope.availableTags = []
    	}

    	// by default we select all tags
    	// NB. Once the tags are loaded
    	$scope.selectedTags = angular.copy($scope.availableTags);
    	$scope.$watch('availableTags', function(newValue, oldValue){
    		if (oldValue.length == 0) {
	    		$scope.selectedTags = angular.copy($scope.availableTags);
    		}
    	})

		// Public
		$scope.isSelected = function(tag){
			return isSelected(tag)
		}

		$scope.toggle = function(tag) {
			toggleTag(tag);
		}

		// Private 
		var isSelected = function(tag) {
			return (-1 != getSelectedTagPosition(tag))
		}

		var toggleTag = function(tag){

			// does tag already exist?
			var pos = getSelectedTagPosition(tag);

			if (pos == - 1)  {
				$scope.selectedTags.push(tag)
			} else {
				$scope.selectedTags.splice(pos, 1)
			}

		}

		var getSelectedTagPosition = function(tag) {
			var pos = $scope.selectedTags.map(function(e) { return e.id; }).indexOf(tag.id);
			
			return pos;
		}

    }
  }
});