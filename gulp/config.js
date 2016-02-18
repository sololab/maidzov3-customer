'use strict';

var gulp = require('gulp');
var fs = require('fs');
var argv = require('yargs').argv;
var ngConstant = require('gulp-ng-constant');
var rename = require('gulp-rename');

var environment = argv.env || 'development';

var ENV = JSON.parse(fs.readFileSync('./env/' + environment + '.json', 'utf8')).ENV;

gulp.task('env', function () {
  gulp.src('./env/' + environment + '.json')
    .pipe(ngConstant({
      name: 'app.maidzo.env'
    }))
    .pipe(rename('maidzo.env.js'))
    .pipe(gulp.dest('./src/app/maidzo'));
});