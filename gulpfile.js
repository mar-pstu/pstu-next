'use strict';

var gulp           = require( 'gulp' );
var styles         = require( 'gulp-sass' );
var html           = require( 'gulp-pug' );
var plumber        = require( 'gulp-plumber' );
var autoprefixer   = require( 'gulp-autoprefixer' );
var images         = require( 'gulp-imagemin' );
var sourcemaps     = require( 'gulp-sourcemaps' );
var uglify         = require( 'gulp-uglify' );       // минифицирует js
var rigger         = require( 'gulp-rigger' );       // склеивает файлы с помощью //- filename-name
var cleancss       = require( 'gulp-clean-css' );
var rename         = require( 'gulp-rename' );       // добавляет суфикс min к имени файла
var cache          = require( 'gulp-cache' );
var del            = require( 'del' );
var browserSync    = require( 'browser-sync' );


styles.compiler      = require( 'node-sass' );

 
gulp.task( 'styles', function () {
  return gulp.src( './src/styles/**/*.scss' )
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( styles().on( 'error', styles.logError ) )
    .pipe( autoprefixer() )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( './build/styles/' ) )
    .on( 'end', browserSync.reload );
} );
 


gulp.task( 'html', function buildHTML() {
  return gulp.src( './src/views/*.pug' )
    .pipe( plumber() )
    .pipe( html( { pretty: true } ) )
    .pipe( gulp.dest( './build/' ) )
    .on( 'end', browserSync.reload );
} );



gulp.task( 'scripts', function () {
  return gulp.src( 'src/scripts/*.js' )
    .pipe( plumber() )
    .pipe( rigger() )
    .pipe( gulp.dest( './build/scripts/' ) )
    .pipe( uglify() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( './build/scripts/' ) );
})



gulp.task( 'images', function () {
    return gulp.src( './src/images/**/*.{png,jpg,svg,gif}' )
        .pipe( plumber() )
        .pipe( cache( images() ) )
        .pipe( gulp.dest( './build/images/' ) )
        .on( 'end', browserSync.reload );
    }
);



gulp.task( 'cleancss', function () {
  return gulp.src( [ './build/styles/**/*.css', '!./build/styles/**/*.min.css' ] )
    .pipe( cleancss( { compatibility: 'ie8' } ) )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( './build/styles/' ) );
} );



gulp.task( 'server', function () {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  } );
} );


gulp.task( 'removebuild', function () {
  return del.sync( 'build' );
} );


gulp.task( 'clearcache', function () {
  return cache.clearAll();
} );



gulp.task( 'watch', function () {
  gulp.watch( './src/styles/**/*.scss',                gulp.series( 'styles', 'cleancss' ) );
  gulp.watch( './src/views/**/*.pug',                  gulp.series( 'html' ) );
  gulp.watch( './src/scripts/**/*.js',                 gulp.series( 'scripts' ) );
  gulp.watch( './src/images/**/*.{png,jpg,svg,gif}',   gulp.series( 'images' ) );
} );



gulp.task( 'default', gulp.series(
  gulp.parallel( 'html', 'styles', 'scripts', 'images' ),
  gulp.parallel( 'watch', 'server' )
) );