var app = angular
	.module('Bubbles', 
		[
			'nvd3', 
			'ngMaterial', 
			'ngMessages', 
			'checklist-model',
			'ui.utils.masks',
			'mdColorPicker'
		]
	)
	.config(function($compileProvider, $locationProvider, $mdThemingProvider){
	   $mdThemingProvider.theme('customTheme') 
          .primaryPalette('grey')
          .accentPalette('orange')
          .warnPalette('red');
	})
