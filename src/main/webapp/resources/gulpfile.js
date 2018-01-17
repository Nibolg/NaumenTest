var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();

var watch = function() {
  browserSync.init({
    server: './build'
  });
  gulp.watch('app/**/*', ['build']);
  gulp.watch('build/*').on('change', browserSync.reload);
};

var build = function () {
  // set up the browserify instance on a task basis
  var b = browserify('./app/Initialize.js', {
    transform: [
      ['babelify', {
        'presets': ['es2015']
      }],
      ['jstify']
    ]
  });

  copy();

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
};

var copy = function () {
    return gulp
      .src(['app/assets/index.html','app/styles/app.css'])
      .pipe(gulp.dest('build'))
      .pipe(browserSync.stream());
};

var start = function () {
  build();
  watch();
};

gulp.task('build', function() { return build(); });
gulp.task('start', function() { return start(); });
