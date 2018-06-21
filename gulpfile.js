'use strict';

var gulp           = require( 'gulp' ),
    sass           = require( 'gulp-sass' ),             // sass / scss
    sourcemaps     = require( 'gulp-sourcemaps' ),       // мапы ( из какого исходника правило )
    autoprefixer   = require( 'gulp-autoprefixer' ),     // префиксы для старых браузеров
    pug            = require( 'gulp-pug' ),              // препроцессор html
    plumber        = require( 'gulp-plumber' ),          // выводит ошбку не прерывая работу gulp
    rigger         = require( 'gulp-rigger' ),           // склеивает файлы с помощью //- filename
    uglify         = require( 'gulp-uglify' ),           // минифицырует js
    cssmin         = require( 'gulp-cssmin' ),           // минификация css
    rename         = require( 'gulp-rename' ),           // переименование / добавление префикса min
    spritesmith    = require( 'gulp.spritesmith' ),
    gulpif         = require( 'gulp-if' ),
    imagemin       = require( 'gulp-imagemin' );


// создание спрайта
gulp.task( 'icon', function () {
    var spriteData =
        gulp.src('./src/icon/*') // путь, откуда берем картинки для спрайта
            .pipe( spritesmith( {
                imgName: 'icon.png',
                cssName: '_icon.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                imgPath: "../images/icon.png",
                cssVarMap: function ( sprite ) {
                  sprite.name = sprite.name
                }
            } ) );
    spriteData.img.pipe( gulp.dest( './build/images/') ); // путь, куда сохраняем картинку
    spriteData.css.pipe( gulp.dest( './src/sass/components/') ); // путь, куда сохраняем стили
});


// сжатие изображений
gulp.task( 'imagemin', function() {
  gulp.src( [ 'src/images/**/*.*', 'src/images/*.*' ] )
  .pipe( imagemin() )
  .pipe( gulp.dest( 'build/images' ) );
});


//pug - сборка html
gulp.task( 'pug', function( callback ) {
  gulp.src( './src/pug/*.pug' )
      .pipe( plumber() )
      .pipe( pug( {
        pretty: true,
      } ) )
      .pipe( gulp.dest( './build/' ) );
  callback();
});


//gulp-rigger - сборка и минификация js файлов
gulp.task( 'js', function ( callback ) {
    gulp.src( './src/scripts/*.js' )
        .pipe( plumber() )
        .pipe( rigger() )
        .pipe( gulp.dest( './build/scripts/' ) )
        .pipe( uglify(), )
        .pipe( rename( { suffix: '.min' } ), )
        .pipe( gulp.dest( './build/scripts/' ) );
    callback();
});


//sass и autoprefixer
gulp.task( 'sass', function ( callback ) {
  return gulp.src( './src/sass/*.scss' )
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 8',
        'Edge >= 12',
        'Explorer >= 8',
        'iOS >= 8',
        'Safari >= 5',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12'
      ],
      cascade: true
    }))
    .pipe( gulp.dest( './build/css' ) )
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe( gulp.dest('./build/css') );
  callback();
});


// минификация css
gulp.task( 'cssmin', function( callback ) {
  return gulp.src( [ './build/css/*.css', '!./build/css/*.min.css' ] )
    .pipe( cssmin() )
    .pipe( rename({suffix: '.min'}) )
    .pipe( gulp.dest('./build/css') );
  callback();
});



gulp.task( 'watch', function () {
  gulp.watch( './src/sass/**/*.*',          [ 'sass' ] );
  gulp.watch( './src/pug/**/*.*',           [ 'pug'] );
  gulp.watch( './src/sprite/**/*.*',        [ 'icon'] );
  gulp.watch( './src/scripts/**/*.*',       [ 'js'] );
  gulp.watch( './src/icon/*.*',             [ 'icon'] );
});

gulp.task( 'default', [ 'sass', 'pug', 'js', 'watch' ] );
gulp.task( 'sprite', [ 'icon' ] );
gulp.task( 'image', [ 'sprite', 'imagemin', 'sass' ] );