// Requirements
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var plumber      = require('gulp-plumber');
var scss         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync');
var runSequence  = require('run-sequence');

// Dirs

var bootstrapSassDir = './node_modules/bootstrap-sass/assets/stylesheets';

// SCSS
gulp.task('scss', function() {
  gulp.src('./scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(scss({
    outputStyle: 'compressed',
    includePaths: [bootstrapSassDir]
  }).on('error', scss.logError))
  .pipe(autoprefixer({ browsers: [ 'last 2 versions' ] }))
  .pipe(sourcemaps.write())
  .pipe(rename('custom.css'))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream())
});

// Browser Sync Dev
gulp.task('browserSync', function() {
  browserSync.init({
    notify: false,
    port: 8080,
    ghostMode: false,
    server: {
      baseDir: './',
      index: './Default.html'
    }
  });

  var reloadBrowser = function() {
    browserSync.reload();
  };

  gulp.watch(['./*.html']).on('change', reloadBrowser);
  gulp.watch(['./img/*']).on('change', reloadBrowser);
  gulp.watch(['./scss/**/*.scss'], ['scss']);
  gulp.watch(['./js/**/*.js']).on('change', reloadBrowser);
});

// Defaullt, comple
gulp.task('default', function(done) {
  runSequence('scss');
});

// Serve Dev
gulp.task('serve', function(done) {
  runSequence('scss', 'browserSync', function() {
  });
});