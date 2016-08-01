'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths,
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('minify', function () {
    gulp.src(['./src/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/')) // It will create folder client.min.js
});

gulp.task('default', ['minify']);
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }).on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});
