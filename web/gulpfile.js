var concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	gulp = require('gulp'),
    expect = require('gulp-expect-file'),
    watch = require('gulp-watch'),
	fs = require('fs');


gulp.task('watch', function () {
    // Endless stream mode 
    gulp.watch('../shared', { 
        ignoreInitial: false
    }, [
        'shared'
    ])

});

gulp.task('default', [
	'shared'
]);

gulp.task('shared', function() {

	gulp
		.src(['../shared/**/*'])
		.pipe(gulp.dest('shared'));

})

// gulp.task('scripts', function() {

//     var files = [
    
//     //- Libraries
//     './public/givecardscontent/components/angular/angular.js',
//     './public/givecardscontent/components/angular-animate/angular-animate.js',
//     './public/givecardscontent/components/angular-messages/angular-messages.js',
//     './public/givecardscontent/components/angular-material/angular-material.js',
//     './public/givecardscontent/components/angular-aria/angular-aria.js',
//     './public/givecardscontent/components/angular-input-masks/angular-input-masks-standalone.js',
//     './public/givecardscontent/components/angular-scroll/angular-scroll.js',
    
//     './public/givecardscontent/js/app.js',
    
//     //- Directives
//     './public/givecardscontent/js/directives/facebook.js',
//     './public/givecardscontent/js/directives/twitter.js',
//     './public/givecardscontent/js/directives/whatsapp.js',
//     './public/givecardscontent/js/directives/gg.chrome.js',

//     //- Services
//     './public/givecardscontent/js/services/TemplateService.js',
//     './public/givecardscontent/js/services/FixtureService.js',
//     './public/givecardscontent/js/services/FormOptionsService.js',
//     './public/givecardscontent/js/services/CardService.js',
//     './public/givecardscontent/js/services/NonInteractiveDialogService.js',
//     './public/givecardscontent/js/services/SuggestedCharitiesService.js',
//     './public/givecardscontent/js/services/DonationService.js',
//     //- Controllers
//     './public/givecardscontent/js/controllers/LandingController.js',
//     './public/givecardscontent/js/controllers/CustomiseController.js',
//     './public/givecardscontent/js/controllers/ShareController.js'

//     ];

//   return gulp.src(files)
//     .pipe(expect(files))
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('./public/givecardscontent/dist/js'));
// });


// gulp.task('styles', function() {


//     var files = [
    
//         './public/givecardscontent/css/normalize.css',
//         './public/givecardscontent/components/angular-material/angular-material.min.css',
//         './public/givecardscontent/DNA/global.css',
//         './public/givecardscontent/DNA/nav.css',
//         './public/givecardscontent/DNA/typography.css',
//         './public/givecardscontent/DNA/buttons.css',
//         './public/givecardscontent/css/designs-mobile.css',
//         './public/givecardscontent/css/designs-desktop.css'

//     ];
//   return gulp.src(files)
//     .pipe(expect(files))
//     .pipe(concatCss('all.css'))
//     .pipe(gulp.dest('./public/givecardscontent/dist/css'));
// });