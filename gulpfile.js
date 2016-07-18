'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths;


gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }).on('error', sass.logError))    
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});
