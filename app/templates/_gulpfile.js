/*
|-------------------------------------------------------------------------------
| Packages
|-------------------------------------------------------------------------------
|
*/

var gulp         = require('gulp'),
    less         = require('gulp-less'),
    watch        = require('gulp-watch'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    minifyCSS    = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');


/*
|-------------------------------------------------------------------------------
| File destination
|-------------------------------------------------------------------------------
|
*/

var path = {
  css_dest: 'app/css',
  js_dest:  'app/js',
  css_src:  'app/css/src/**/*.less',
  js_src:   'app/js/src/**/*.js'
};

var bower_path = {  
  css: [
    "bower_components/bootstrap/dist/css/bootstrap.min.css"
  ],
  js: [
    "bower_components/jquery/jquery.min.js"
  ]
};


/*
|-------------------------------------------------------------------------------
| Vendors
|-------------------------------------------------------------------------------
|
*/

gulp.task('js_vendor', function() {
  gulp.src(bower_path.js)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.js_dest));
});

gulp.task('css_vendor', function() {
  gulp.src(bower_path.css)
    .pipe(concat('vendor.min.css'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.css_dest));
});


/*
|-------------------------------------------------------------------------------
| Main application
|-------------------------------------------------------------------------------
|
*/

gulp.task('js_task', function() {
  gulp.src(path.js_src)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.js_dest));
});

gulp.task('css_task', function() {
  gulp.src(path.css_src)
    .pipe(concat('styles.min.css'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.css_dest));
});


/*
|-------------------------------------------------------------------------------
| Watch
|-------------------------------------------------------------------------------
|
*/

gulp.task('watch', function() {

  // Bower JS and CSS files are performed once at start - performance reasons
  gulp.run('css_vendor');
  gulp.run('js_vendor');

  gulp.watch(path.css_src, ['css_task']);
  gulp.watch(path.js_src, ['js_task']);
});
 
gulp.task('default', ['watch']);
