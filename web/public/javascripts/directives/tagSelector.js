app.directive('tagSelector', function() {
  return {
    templateUrl: '/partials/directives/tagSelector',
    scope: {
    	availableTags: '=',
    	selectedTags: '='
    },
    controller: function($scope) {
    	$scope.allTags = true;

    	// check we have two arrays
    	if (!Array.isArray($scope.availableTags)) {
    		console.log('availableTags not an array, no tags available')
    		$scope.availableTags = []
    	}

    	// by default we select all tags
    	$scope.selectedTags = angular.copy($scope.availableTags)
    },
    link: function(scope, el, attrs) {

		// Public
		scope.isSelected = function(tag){
			return isSelected(tag)
		}

		scope.toggle = function(tag) {
			toggleTag(tag);
		}

		scope.toggleAllTags = function() {
			if(scope.allTags) {
				scope.selectedTags = angular.copy(scope.availableTags)
			} else {
				scope.selectedTags = recallPreviousSelection()
			}
		}

		// Private 
		var rememberedSelectedTags = [];;

		var isSelected = function(tag) {
			if(scope.allTags) return true
			else return (-1 != scope.selectedTags.map(function(e) { return e.id; }).indexOf(tag.id))
		}

		var toggleTag = function(tag){

			// does tag already exist?
			var pos = scope.selectedTags.map(function(e) { return e.id; }).indexOf(tag.id);

			if (pos == - 1)  {

				// will this mean all tags selected?
				if(scope.selectedTags.length == scope.availableTags.length - 1) {
					// all are selected
					scope.allTags = true;

					// remember selection before
					rememberPreviousSelection()
				}

				scope.selectedTags.push(tag)
			} else {
				scope.selectedTags.splice(pos)
			}


		}

		var rememberPreviousSelection = function() {
			rememberedSelectedTags = angular.copy(scope.selectedTags)
		}

		var recallPreviousSelection = function() {
			return angular.copy(rememberedSelectedTags)
		}

    }
  }
});