app.directive('tagSelector', function() {
  return {
    templateUrl: '/partials/directives/tagSelector',
    scope: {
    	availableTags: '=',
    	haveTags: '=',
    	haveNotTags: '='
    },
    link: function(scope, el, attrs) {

		// Public
		scope.isSelectedHas = function(tag){
			return isSelected(scope.haveTags, tag)
		}

		scope.isSelectedHasNot = function(tag){
			return isSelected(scope.haveNotTags, tag)
		}

		scope.toggleHas = function(tag) {
			scope.haveTags = toggleTag(scope.haveTags, tag);
		}

		scope.toggleHasNot = function(tag) {
			scope.haveNotTags = toggleTag(scope.haveNotTags, tag);
		}


		// Private 
		var isSelected = function(tags, tag) {

			return -1 != tags.map(function(e) { return e.id; }).indexOf(tag.id);
		}

		var toggleTag = function(tags, tag){

			// does tag already exist?
			var pos = tags.map(function(e) { return e.id; }).indexOf(tag.id);

			if (pos == - 1)  {
				tags.push(tag)
			} else {
				tags.splice(pos)
			}

			return tags
		}

    }
  }
});