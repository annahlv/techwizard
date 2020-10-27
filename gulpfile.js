const gulp           = require('gulp');
const browserSync    = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['src/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('src'))
});

gulp.task('serve', ['nunjucks'], function() {
    browserSync.init({
        server: "./src"  
    });
});

// Default Task
gulp.task('default', ['serve']);
