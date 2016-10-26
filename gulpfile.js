var concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	gulp = require('gulp'),
    expect = require('gulp-expect-file'),
    watch = require('gulp-watch'),
	fs = require('fs');


gulp.task('watch', function () {

    // Endless stream mode 
    return gulp.watch('./shared/**', { 
        ignoreInitial: false
    }, [
        'shared'
    ])

});

gulp.task('default', [
	'shared'
]);

gulp.task('shared', function() {

	console.log('Shared folder changed')
	
	gulp
		.src(['./shared/**/*'])
		.pipe(gulp.dest('./web/shared'));

	// gulp
	// 	.src(['./shared/**/*'])
	// 	.pipe(gulp.dest('./poller/shared'));

})
