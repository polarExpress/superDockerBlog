var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var ngAnnotate   = require('gulp-ng-annotate');
var expect       = require('gulp-expect-file');
var mainBowerFiles = require('main-bower-files');
var rename       = require('gulp-rename');
var watch        = require('gulp-watch');

/*
*
* Paths
*
*/


//If not found use this: gulp.src(paths, {cwd: 'public/'})

var stylesPaths = [
  'public/scss/*.scss'
];

var bowerPaths = [
  'public/bower_components/**/*',
];

var paths = [
  'public/javascripts/angularApp.js',
  'public/javascripts/components/**/module.js',
  '!public/javascripts/components/**/test.js',
  'public/javascripts/components/**/*.js'
];

var testPaths = [
  'public/javascripts/components/**/test.js',
];

var htmlPaths = [
  'public/javascripts/components/**/*.html'
];

/*
*
* Builders
*
*/

gulp.task('styles', function() {
  gulp.src(stylesPaths)
  .pipe(sass({ style: 'expanded' }))
  .pipe(autoprefixer('last 2 version'))
  .pipe(minifyCss())
  .pipe(gulp.dest('static/css'));
});

gulp.task('js', function () {
  gulp.src(paths)
    .pipe(sourcemaps.init())
      .pipe(concat('compiledApp.js'))
      .pipe(ngAnnotate())
      //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/js'));
});

gulp.task('tests', function () {
  gulp.src(testPaths)
    .pipe(sourcemaps.init())
      .pipe(concat('test.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('tests/'));
});

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles())
  .pipe(gulp.dest('static/bower_components'));
});

gulp.task('bow', function() {
  gulp.src(bowerPaths)
  .pipe(gulp.dest('static/bower_components'));
});

gulp.task('html', function(){
 gulp.src(htmlPaths)
 .pipe(rename({dirname: ''}))
 .pipe(gulp.dest('static/html'));
});


/*
*
* Watchers
*
*/

gulp.task('watchCss', function () {
  watch(stylesPaths, function () {
    gulp.start('styles');
  });
});

gulp.task('watchJs', function () {
  watch(paths, function () {
    gulp.start('js');
  });
});

gulp.task('watchTests', function () {
  watch(testPaths, function () {
    gulp.start('tests');
  });
});

gulp.task('watchHtml', function () {
  watch(htmlPaths, function () {
    gulp.start('html');
  });
});

/*
If needed nodemon
gulp.task('develop', function () {
  nodemon({script: './bin/www', ext: 'js hjs json', legacyWatch: true });
});
*/

gulp.task('default', ['js', 'styles', 'tests', 'html', 'bow']);
