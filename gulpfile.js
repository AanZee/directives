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
            templates: 'dist/views/aanzee/directives/'
        },
        files: {
            js: 'directives.min.js'
        }
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
gulp.task('build', ['moveTemplates'], function(){
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