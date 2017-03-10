var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');

// Resize pizzeria.jpg since it's too large and we can save on file size
gulp.task('resizePizzeria', function () {
  gulp.src('src/views/images/pizzeria.jpg')
    .pipe(imageResize({
      width : 573,
      height: 430,
      quality: 1
    }))
    .pipe(gulp.dest('dist/views/images'));
});

// Minify CSS
gulp.task('minifycss', function() {
  gulp.src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});


// Minify JavaScript
gulp.task('minifyjs', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Minify HTML
gulp.task('minifyhtml', function() {
  gulp.src('src/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', [ 'resizePizzeria', 'minifycss', 'minifyjs', 'minifyhtml' ]);
