/**
 * Gulpfile
 * ------------------------------------------------------
 * During development run:
 * $ gulp
 *
 * Build your project before commit:
 * $ gulp build
 */

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

/**
 * Settings
 */
var settings = {
    sources: {
        js: 'src/**/*.js',
        templates: 'src/**/*.view.html'
    },
    output: {
        dirs: {
            js: 'dist/js/',
            jsVendor: 'dist/js/vendor/',
            cssVendor: 'dist/css/vendor/',
            templates: 'dist/views/aanzee/directives/'
        },
        files: {
            js: 'directives.min.js'
        }
    },
    dependencies: {
        js: [
            'bower_components/pikaday/pikaday.js',
            'bower_components/moment/moment.js',
            'bower_components/moment/locale/nl.js',
            'bower_components/moment/locale/de.js'
        ],
        css: [
            'bower_components/pikaday/css/pikaday.css',
            'bower_components/pikaday/scss/pikaday.scss'
        ]
    }
};

/**
 * Error Handler
 * ------------------------------------------------------
 * Handles the error if one occurs while building.
 */
var onError = function(err) {
    console.log(err);
    this.emit('end');
};

/**
 * Move templates task
 * ------------------------------------------------------
 * Moves the templates to the distribution folder
 */
gulp.task('moveTemplates', function(){
    return gulp.src(settings.sources.templates)
        .pipe(gulp.dest(settings.output.dirs.templates));
});

/**
 * Move vendor javascript dependencies
 * ------------------------------------------------------
 * Moves the dependencies to the distribution folder
 */
gulp.task('moveJsDependencies', function(){
    return gulp.src(settings.dependencies.js)
        .pipe(gulp.dest(settings.output.dirs.jsVendor));
});

/**
 * Move vendor css dependencies
 * ------------------------------------------------------
 * Moves the dependencies to the distribution folder
 */
gulp.task('moveCssDependencies', function(){
    return gulp.src(settings.dependencies.css)
        .pipe(gulp.dest(settings.output.dirs.cssVendor));
});

/**
 * Lint's the Javascript
 * ------------------------------------------------------
 */
gulp.task('jsLint', function(){
    return gulp.src(settings.sources.js)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

/**
 * Minify Javascript
 * ------------------------------------------------------
 * Minifies the Javascript and output to the distribution folder
 */
gulp.task('build', ['moveTemplates', 'moveJsDependencies', 'moveCssDependencies'], function(){
    gulp.src(settings.sources.js)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(concat(settings.output.files.js))
        .pipe(uglify())
        .pipe(gulp.dest(settings.output.dirs.js));
});