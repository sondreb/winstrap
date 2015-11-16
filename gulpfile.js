'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    $ = require('gulp-load-plugins')({ pattern: ['*'] });

gulp.task('default', ['clean', 'sass', 'assemble', 'copy', 'fileExists', 'jshint']);

gulp.task('clean', function () { });

gulp.task('sass', function () {
    return gulp.src('./src/scss/winstrap.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({ outputStyle: 'nested', precision: 5, includePaths:['node_modules'] }).on('error', $.sass.logError))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./distgulp/css'));
});

gulp.task('assemble', ['assemble:pages']);

gulp.task('assemble:pages', function() {});

gulp.task('copy', ['copy:assets', 'copy:doc']);

gulp.task('copy:assets', ['copy:assets:files']);

gulp.task('copy:assets:files', function () {});

gulp.task('copy:doc', ['copy:doc:files']);

gulp.task('copy:doc:files', function () {});

gulp.task('watch', ['watch:sass', 'watch:doc']);

gulp.task('watch:sass');

gulp.task('watch:doc');
