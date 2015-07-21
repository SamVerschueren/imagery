'use strict';

var path = require('path'),
	gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass');

/**
 * The sass task compiles the SCSS files to css files.
 */
gulp.task('sass', function() {
    return gulp.src('assets/style/**/*.scss', {cwd: 'src'})
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('assets/style', {cwd: 'src'}));
});

/**
 * The CSS task sets a watcher on all the SCSS files in the assets/style folder
 * and runs the sass task if one of those files has been changed.
 */
gulp.task('watch', function() {
    watch('src/**/*.scss', function(file) {
        console.log('\t' + path.basename(file.path) + ' has been changed, running sass...');
        gulp.start('sass');
    });
});