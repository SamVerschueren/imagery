'use strict';

/**
 * This file builds the distribution package of the application. Just run `gulp build`.
 * 
 * @author Sam Verschueren
 * @since  11 Aug. 2015
 */

// module dependencies
var path = require('path'),
    gulp = require('gulp'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    header = require('gulp-header'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    htmlreplace = require('gulp-html-replace'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    lazypipe = require('lazypipe'),
    moment = require('moment'),
    minimist = require('minimist'),
    del = require('del'),
    merge = require('merge2'),
    _ = require('lodash');

var pkg = require('./package.json'),
    banner = ['/**',
              ' * <%= pkg.name %> v<%= pkg.version %>',
              ' * ',
              ' * @author <%= pkg.author.name %>     <<%= pkg.author.email %>>',
              ' * @since  ' + moment().format('DD MMM. YYYY'),
              ' */\n'].join('\n');

var options = minimist(process.argv.slice(2), {
    string: ['env'],
    default: { 
        env: process.env.NODE_ENV || 'development'
    }
});

/**
 * This builder function is a helper function that helps building a pipeline
 * that is used very often. The pipeline basically concatenates all the files
 * and executes a certain function on it like minifying or uglifying. It
 * prepends a banner to the files and if the maps parameter is set to true, it
 * will generate sourcemaps for the generated file.
 *
 * Example usages for this function are
 *
 *     builder(uglify, 'Controllers.min.js')                            -> no sourcemaps
 *     builder(uglify, 'Controllers.min.js', true)                      -> sourcemaps
 *     builder(cssmin, 'fonts.min.css', {keepSpecialComments: 0})       -> no sourcemaps, removes special comments
 *     builder(cssmin, 'fonts.min.css', true, {keepSpecialComments: 0}) -> sourcemaps, removes special comments
 *
 * @param  {Function} fn       The function to execute (uglify, htmlmin, cssmin)
 * @param  {String}   filename The filename that should be used.
 * @param  {Boolean}  maps     [optional] True if you want source maps; false otherwise.
 * @param  {Object}   options  [optional] Extra options for the fn function.
 * @return {Function}          A pipeline constructed by the arguments.
 */
function builder(fn, filename, maps, options) {
    if(_.isPlainObject(maps)) {
        // If maps is a plain object, the maps parameter is the options parameter
        options = maps;
        maps = false;
    }

    // Create and return the pipeline
    return lazypipe()
            .pipe(function() {
                return gulpif(maps === true, sourcemaps.init());
            })
            .pipe(concat, filename)
            .pipe(fn, options || {})
            .pipe(header, banner, {pkg: pkg})
            .pipe(function() {
                return gulpif(maps === true, sourcemaps.write('.'));
            })();
}

/**
 * The clean tasks removes the dist folder so that a clean build
 * can be done.
 */
gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

/**
 * The sass task compiles the SCSS files to css files.
 */
gulp.task('sass', function() {
    return gulp.src('assets/style/**/*.scss', {cwd: 'src'})
        .pipe(gulpif(options.env === 'development', sourcemaps.init()))
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(gulpif(options.env === 'development', sourcemaps.write('.')))
        .pipe(gulp.dest('assets/style', {cwd: 'src'}));
});

/**
 * Install the bower components.
 */
gulp.task('bower', function() {
    return bower();
});

/**
 * The uglify task uglifies everything that can be uglified. It uglifies all
 * the controllers, services, models and so on.
 */
gulp.task('uglify', ['clean', 'bower'], function() {
    var controllers = gulp.src(['app/controllers/Controller.js', 'app/controllers/TitleBarController.js', 'app/controllers/**/*.js'], {cwd: 'src'})
        .pipe(builder(uglify, 'Controllers.min.js', options.env === 'development'))
        .pipe(gulp.dest('dist/app/controllers'));

    var components = gulp.src(['app/components/Components.js', 'app/components/**/*.js'], {cwd: 'src'})
        .pipe(builder(uglify, 'Components.min.js', options.env === 'development'))
        .pipe(gulp.dest('dist/app/components'));

    var services = gulp.src(['app/services/Service.js', 'app/services/**/*.js'], {cwd: 'src'})
        .pipe(builder(uglify, 'Services.min.js', options.env === 'development'))
        .pipe(gulp.dest('dist/app/services'));

    var models = gulp.src(['app/models/Model.js', 'app/models/**/*.js'], {cwd: 'src'})
        .pipe(builder(uglify, 'Models.min.js', options.env === 'development'))
        .pipe(gulp.dest('dist/app/models'));

    var assets = gulp.src(['assets/scripts/**/*.js'], {cwd: 'src'})
        .pipe(builder(uglify, 'Custom.min.js', options.env === 'development'))
        .pipe(gulp.dest('dist/assets/scripts'));
        
    var config = gulp.src(['config/**/*.js', '!config/config.sample.js'], {cwd: 'src'})
        .pipe(builder(uglify, 'Application.min.js', options.env === 'development'))
        .pipe(gulp.dest('dist'));

    var libraries = gulp.src([
            'bower_components/ng-file-upload/ng-file-upload.min.js'
        ], {cwd: 'src'})
        .pipe(builder(uglify, 'Libraries.min.js'))
        .pipe(gulp.dest('dist/libs'));

    return merge(controllers, components, services, models, assets, config, libraries);
});

/**
 * The minify task minifies everything that can be minified. It minifies all the
 * html files, css files.
 */
gulp.task('minify', ['clean', 'sass'], function() {
    var replacements = {
        'css': ['assets/style/style.min.css'],
        'js': ['libs/Libraries.min.js', 'app/controllers/Controllers.min.js', 'app/models/Models.min.js', 'app/services/Services.min.js', 'app/components/Components.min.js', 'assets/scripts/Custom.min.js', 'Application.min.js']
    };
    
    var views = gulp.src('app/views/**/*.html', {cwd: 'src'})
        .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
        .pipe(gulp.dest('dist/app/views'));

    var components = gulp.src('app/components/**/*.html', {cwd: 'src'})
        .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
        .pipe(gulp.dest('dist/app/components'));

    var index = gulp.src('index.html', {cwd: 'src'})
        .pipe(htmlreplace(replacements, {keepUnassigned: true}))
        .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));

    var style = gulp.src(['assets/style/reset.css', 'assets/style/app.css', 'assets/style/**/*.css', 'assets/js/**/*.css'], {cwd: 'src'})
        .pipe(builder(cssmin, 'style.min.css', options.env === 'development'))
        .pipe(gulp.dest('dist/assets/style'));

    return merge(views, components, index, style);
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


/**
 * Build the entire project.
 */
gulp.task('build', ['clean', 'uglify', 'minify']);

/**
 * The default task will run the build task.
 */
gulp.task('default', ['build']);