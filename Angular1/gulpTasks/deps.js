const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

gulp.task('deps',['deps.fonts','deps.css','deps.js'])

gulp.task('deps.fonts', ()=>{
  return gulp.src([
    'node_modules/font-awesome/fonts/*.*',
    'node_modules/admin-lte/bootstrap/fonts/*.*'
  ])
  .pipe(gulp.dest('public/assets/fonts'))

})
gulp.task('deps.css', ()=>{
  return gulp.src([
    'node_modules/angular-toastr/dis/angular-toastr.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/admin-lte/dist/css/AdminLTE.min.css',
    'node_modules/admin-lte/dist/css/skins/_all-skins.min.css',
    'node_modules/admin-lte/bootstrap/css/bootstrap.min.css'
  ])
  .pipe(uglifycss({"uglifyComments":true}))
  .pipe(concat('deps.min.css'))
  .pipe(gulp.dest('public/assets/css'))

})
gulp.task('deps.js', ()=>{
  return gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-toastr/dis/angular-toastr.tpls.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/admin-lte/plugins/jQuery/jQuery-2.1.4.min.js',
    'node_modules/admin-lte/bootstrap/js/bootstrap.min.js',
    'node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min.js',
    'node_modules/admin-lte/dist/js/app.min.js'
  ])
  .pipe(uglify())
  .pipe(concat('deps.min.js'))
  .pipe(gulp.dest('public/assets/js'))

})
