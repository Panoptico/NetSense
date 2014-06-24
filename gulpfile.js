var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');
var nodemon = require('gulp-nodemon');
var open = require('gulp-open');

var paths = {
  scripts: ['server/**/*.js'],
  specs: ['specs/*.js']
};

//TODO: look into gulp hangup on running test
gulp.task('test', ['lint', 'runTests']);

gulp.task('lint', function(){
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({message: 'Lint done'}));
});

gulp.task('runTests',function() {
  return gulp.src(paths.specs)
    .pipe(mocha());
});
