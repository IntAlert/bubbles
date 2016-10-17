
app.controller('TagSelectorController', function ($scope, ScrapeService) {



	// Tag Selector
	$scope.haveTags = [];
	$scope.haveNotTags = [];
	$scope.availableTags = [{
		"id": 1,
		"name": "One"
	},{
		"id": 2,
		"name": "Two"
	}];
	// $scope.availableTags = TagService.all



	$scope.scrapes = ScrapeService.all;
	var stepArray = []

	$scope.$watch('scrapes', function(){

		console.log(ScrapeService.all)
		stepArray = ScrapeService.all.map(function(scrape){
			return {
				value: scrape.id,
				legend: scrape.createdAt
			}
		})
	})







	$scope.slider = {
		value: {

		},
		options: {
			stepArray: stepArray
		}
	}

})