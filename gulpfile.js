/* global __dirname */
'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    $ = require('gulp-load-plugins')({ pattern: ['*'] });

var settings = {
    source: 'src',
    destination: 'distgulp'
}

function getSourcePath() {
    var args = Array.prototype.slice.call(arguments).join(',');
    return path.join(__dirname, args);    
}

var paths = {
    node: getSourcePath('node_modules'),
    source: {
        fonts:  getSourcePath(settings.source, 'scss', 'winstrap.scss'), 
        style:  getSourcePath(settings.source, 'scss', 'winstrap.scss'),
        styles:  getSourcePath(settings.source, '**/*.scss'),
    },
   
    target: {
       root: getSourcePath(settings.destination),
       styles: getSourcePath(settings.destination, 'css'),
    }
}

gulp.task('default', ['clean', 'sass', 'assemble', 'copy', 'fileExists', 'jshint']);

gulp.task('clean', function () { });

gulp.task('sass', function () {
    return gulp.src(paths.source.style)
        .pipe($.sourcemaps.init())
        .pipe($.sass({ outputStyle: 'nested', precision: 5, includePaths:[paths.node] }).on('error', $.sass.logError))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.target.styles));
});

gulp.task('assemble', ['assemble:pages']);

gulp.task('assemble:pages', function() {});

gulp.task('copy', ['copy:assets', 'copy:doc']);

gulp.task('copy:assets', ['copy:assets:files']);

gulp.task('copy:assets:files', function () {
    
    
    
    
});

gulp.task('copy:doc', ['copy:doc:files']);

gulp.task('copy:doc:files', function () {});

gulp.task('watch', ['watch:sass', 'watch:doc']);

gulp.task('watch:sass', function () {
    return gulp.watch(paths.source.styles, ['sass'])
});

gulp.task('watch:doc');

gulp.task('fileExists', function() {});

gulp.task('jshint', function() {});

gulp.task('compare', function() {
   return gulp.src('./dist/**/*.*')
        .pipe($.diff('./distgulp'))
        .pipe($.diff.reporter({fail:true})); 
});
