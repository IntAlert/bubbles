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
	.config(function($compileProvider, $locationProvider, $mdThemingProvider, $mdIconProvider){
	  $mdIconProvider
	    .defaultIconSet('/components/material-design-icons/iconfont/MaterialIcons-Regular.svg', 24)


	   $mdThemingProvider.theme('customTheme') 
          .primaryPalette('grey')
          .accentPalette('orange')
          .warnPalette('red');
	})
