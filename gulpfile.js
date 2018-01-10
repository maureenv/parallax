var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss')
var cssnano = require('cssnano'); //minify css
var autoprefixer = require('autoprefixer')
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref'); // selects files to minify
var uglify = require('gulp-uglify'); //uglify js
var gulpIf = require('gulp-if'); // only minify js files
var imagemin = require('gulp-imagemin'); // minify images
var cache = require('gulp-cache'); // optimize images
var del = require('del'); // for deleting files that are no longer in use
var runSequence = require('run-sequence'); // for combining gulp tasks
// https://github.com/matthaliski/notes/wiki/Git-push-to-HostGator
// https://mikeeverhart.net/2016/01/deploy-code-to-remote-servers-with-gulp-js/
// https://gist.github.com/plasticbrain/b98b5c3b97e7226353ce

gulp.task('sass', function(){
  return gulp.src('app/scss/main.scss')
  .pipe(sass()) //refering to var sass
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('css', function () {
    var plugins = [
        autoprefixer({browsers: ['> 5%']}),
        cssnano()
    ];
    return gulp.src('app/css/main.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist'));
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// this will automatically change CSS file when I save SASS file and I can view changes in the browser as I save. Just do 'gulp watch'

// the *.scss is a globbing pattern that allows me to select all files that end in scss. The ** allows me to select files ending in .scss in root and child folders

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});



//this minifies javascript files when I run gulp useref. Make sure to surround js files in index.html with <!--build:js js/main.min.js -->

// this task uglifies js files and css.
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

// run gulp images to minify images
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      // Setting interlaced to true
      interlaced: true
    }))
  .pipe(gulp.dest('dist/images'))
});

// run gulp clean:dist to delete files in dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// delete cache from local system
gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
})


gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'css', 'useref'],
    callback
  )
})

// a task named default can be run just by typing gulp
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})
