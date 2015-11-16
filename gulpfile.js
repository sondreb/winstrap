/* global __dirname */
'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    source = require('vinyl-source-stream'),
    $ = require('gulp-load-plugins')({ pattern: ['*'] });

// Until we remove dual gulp compile, we must override this setting.
utils.paths.destinationPath = 'distgulp';

var paths = {
    node: utils.getPath('node_modules'),
    source: {
        style:  utils.getSourcePath('scss', 'winstrap.scss'),
        styles:  utils.getSourcePath('**/*.scss'),
        assets: {
            fonts: utils.getSourcePath('fonts/**/*.*'),
            images: utils.getSourcePath('images/**/*.*')
        },
        doc: {
           js: utils.getSourcePath('js', '**/*.js'),
           jsvendor: [
               utils.getPath('node_modules', 'jquery', 'dist', 'jquery.min.js'), 
               utils.getPath('node_modules', 'jquery', 'dist', 'jquery.min.map'),
               utils.getPath('node_modules', 'bootstrap-sass', 'assets', 'javascripts', 'bootstrap.min.js')
           ]
        } 
    },
   
    target: {
       gruntroot: utils.getPath('dist'), // Temporary
       root: utils.getTargetPath(),
       styles: utils.getTargetPath('css'),
       assets: {
           fonts: utils.getTargetPath('fonts'),
           images: utils.getTargetPath('images') 
       },
       doc: {
           js: utils.getTargetPath('js'),
           jsvendor: utils.getTargetPath('js', 'vendor')
       }
    }
}

gulp.task('default', function (callback) {
    $.runSequence('clean', 'sass', 'assemble', 'copy', 'fileExists', 'jshint', 'grunt', callback);
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

gulp.task('assemble:pages', function() {});

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



