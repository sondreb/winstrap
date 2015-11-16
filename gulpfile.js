/* global __dirname */
'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    $ = require('gulp-load-plugins')({ pattern: ['*'] });

var settings = {
    source: 'src',
    destination: 'distgulp',
    gruntdestination: 'dist'
}

function getSourcePath() {
    var fullPath = __dirname;
    for (var i = 0; i < arguments.length; i++) {
        fullPath = path.join(fullPath, arguments[i]);
    }
    return fullPath;
}

var paths = {
    node: getSourcePath('node_modules'),
    source: {
        style:  getSourcePath(settings.source, 'scss', 'winstrap.scss'),
        styles:  getSourcePath(settings.source, '**/*.scss'),
        assets: {
            fonts: getSourcePath(settings.source, 'fonts/**/*.*'),
            images: getSourcePath(settings.source, 'images/**/*.*')
        }
    },
   
    target: {
       gruntroot: getSourcePath(settings.gruntdestination),
       root: getSourcePath(settings.destination),
       styles: getSourcePath(settings.destination, 'css'),
       assets: {
           fonts: getSourcePath(settings.destination, 'fonts'),
           images: getSourcePath(settings.destination, 'images') 
       }
    }
}

gulp.task('default', ['clean', 'sass', 'assemble', 'copy', 'fileExists', 'jshint', 'grunt']);

gulp.task('clean', function () { 
    return gulp.src([paths.target.root, paths.target.gruntroot], { read: false})
        .pipe($.clean());
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

gulp.task('copy:assets', ['copy:assets:files']);

gulp.task('copy:assets:files', ['copy:assets:files:fonts', 'copy:assets:files:images']);

gulp.task('copy:assets:files:fonts', function () {
    return gulp.src(paths.source.assets.fonts)
        .pipe(gulp.dest(paths.target.assets.fonts));
});

gulp.task('copy:assets:files:images', function () {
    return gulp.src(paths.source.assets.images)
        .pipe(gulp.dest(paths.target.assets.images));
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
