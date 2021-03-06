/* global __dirname */
'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    utils = require('./gulp/utils'),
    paths = require('./gulp/paths'),
    source = require('vinyl-source-stream'),
    $ = require('gulp-load-plugins')({ 
            pattern: ['*'], 
            scope: ['devDependencies', 'optionalDependencies'],
            rename: { 'assemble': '_assemble' } });

gulp.task('default', function (callback) {
    $.runSequence('clean', 'sass', 'assemble', 'copy', 'fileExists', 'jshint', 'grunt', callback);
});

gulp.task('server', function() {
    
        var files = [
            paths.target.root + '**/*.html',
            paths.target.root + '**/*.css',
            paths.target.root + '**/*.png',
            paths.target.root + '**/*.js',
            paths.target.root + '**/*.svg'
        ];
    
        $.browserSync.init(files, {
        server: paths.target.root,
        port: 9001,
        https: false,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        ui: { port: (9002) },
        browser: "google chrome"
    });
    
});

gulp.task('clean', function () { 
    return gulp.src([paths.target.root, paths.target.gruntroot], { read: false})
        .pipe($.rimraf());
});

gulp.task('sass', function () {
    return gulp.src(paths.source.style)
        .pipe($.sourcemaps.init())
        .pipe($.sass({ outputStyle: 'nested', precision: 5, includePaths:[paths.node] }).on('error', $.sass.logError))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.target.styles));
});

gulp.task('assemble', ['assemble:pages']);

gulp.task('assemble:pages', function() {
    
    return gulp.src(paths.source.pages.root)
        .pipe($.assemble($._assemble, {
            partials: [paths.source.pages.partials],
            layout: [paths.source.pages.layouts],
            helpers: [paths.source.pages.helpers],
            flatten: true,
            data: paths.source.pages.data,
    
            // Set the version number
            version: '1.0',
    
            // Name of the project
            name: 'winstrap',
        }))
        .pipe(gulp.dest(paths.target.pages));
});

gulp.task('copy', ['copy:assets', 'copy:doc']);

gulp.task('copy:assets', ['copy:assets:fonts', 'copy:assets:images']);

gulp.task('copy:assets:fonts', function () {
    return gulp.src(paths.source.assets.fonts)
        .pipe(gulp.dest(paths.target.assets.fonts));
});

gulp.task('copy:assets:images', function () {
    return gulp.src(paths.source.assets.images)
        .pipe(gulp.dest(paths.target.assets.images));
});

gulp.task('copy:doc', ['copy:doc:js', 'copy:doc:jsvendor']);

gulp.task('copy:doc:js', function () {
   return gulp.src(paths.source.doc.js)
        .pipe(gulp.dest(paths.target.doc.js)); 
});

gulp.task('copy:doc:jsvendor', function() {
   return gulp.src(paths.source.doc.jsvendor)
        .pipe(gulp.dest(paths.target.doc.jsvendor)); 
});

gulp.task('watch', ['watch:sass', 'watch:doc']);

gulp.task('watch:sass', function () {
    return gulp.watch(paths.source.styles, ['sass'])
});

gulp.task('watch:doc');

gulp.task('fileExists', function() {});

gulp.task('jshint', function() {});

gulp.task('grunt', function(cb) {
  var exec = require('child_process').exec;
  exec('grunt', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('compare', function() {
   return gulp.src('./dist/**/*.*')
        .pipe($.diff('./distgulp'))
        .pipe($.diff.reporter({fail:true})); 
});



