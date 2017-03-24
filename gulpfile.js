const gulp           = require('gulp');
const less           = require('gulp-less');
const browserSync    = require('browser-sync');
const concat         = require('gulp-concat');
const uglify         = require('gulp-uglifyjs');
const cssnano        = require('gulp-cssnano');
const rename         = require('gulp-rename');
const del            = require('del');
const imagemin       = require('gulp-imagemin');
const pngquant       = require('imagemin-pngquant');
const cache          = require('gulp-cache');
const autoprefixer   = require('gulp-autoprefixer');
const plumber        = require('gulp-plumber');
const csscomb        = require('gulp-csscomb');
const spritesmith    = require('gulp.spritesmith');
const svgstore       = require('gulp-svgstore');
const svgmin         = require('gulp-svgmin');
const cheerio        = require('gulp-cheerio');
const replace        = require('gulp-replace');
const smartgrid      = require('smart-grid');
const pug            = require('gulp-pug2');
const notify         = require('gulp-notify');

//SVG-спрайт(собирает спрайт и кидает в корень img с расширением HTML)
gulp.task('svgSprite', function () {
  return gulp.src('src/img/svg/*.svg')    
    .pipe(svgmin(function (file) {
      return {
        plugins: [{
          cleanupIDs: {
            minify: true
          }
        }]
      }
    }))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(cheerio({
      run: function ($) {
          $('svg').attr('style', 'display:none;');
        },
          parserOptions: { xmlMode: true }
    }))    
    .pipe(rename('symbol-sprite.html'))
    .pipe(gulp.dest('src/img/'));
});

//PNG-спрайт(кидает в корень img + css в less/blocks)
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/img/icons/*.png')
  .pipe(spritesmith({
    imgName: '../img/sprite.png',
    cssName: 'sprite.css',
    cssFormat: 'css',
    algorithm: 'top-down',
    padding: 10
  }));
  spriteData.img.pipe(gulp.dest('src/img/'));
  spriteData.css.pipe(gulp.dest('src/less/'));
});

//Шаблонизатор
gulp.task('pug', function() {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({}).on( "error", notify.onError({
      message: "<%= error.message %>",
      title  : "Pug Error!"
      })))
    .pipe(gulp.dest('src/'))
});

//LESS-препроцессор
gulp.task('less', function() {
  gulp.src('src/less/style.less')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(less())
    .pipe(autoprefixer(['last 4 versions'], { cascade: true }))
    .pipe(csscomb())
    .pipe(gulp.dest('src/css'))    
});

//Browser-sync
gulp.task('browser-sync', function() {
  browserSync({
      server: {
          baseDir: 'src'
      },
      notify: false
  });
});

//Собираем, углифицирцем скрипты
gulp.task('scripts', function() {
  return gulp.src([
    'src/js/libs/jquery.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
});

//Минимизируем css, добавляем префикс min
gulp.task('css-libs', ['less'], function() {
  return gulp.src('src/css/style.css')
      .pipe(cssnano())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('src/css'));
});

//Основной таск
gulp.task('watch', ['browser-sync', 'less'], function() {
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/pug/**/*.pug', ['pug']);
  //gulp.watch('src/js/main.js', ['lint']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/css/*.css', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

//Удаляние папки build перед выгрузкой
gulp.task('clean', function() {
  return del.sync('build');
});

//Оптимиация изображений
gulp.task('img', function() {
  return gulp.src('src/img/**/*.*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
  })))
    .pipe(gulp.dest('build/img'));
});

//Выгружаем проект в build
gulp.task('build', ['clean', 'img', 'css-libs', 'scripts'], function() {

  var buildCss = gulp.src([ 
      'src/css/*.css',
      ])
  .pipe(gulp.dest('build/css'))

  var buildFonts = gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('build/fonts'))

  var buildJs = gulp.src('src/js/**/*')
  .pipe(gulp.dest('build/js'))

  var buildHtml = gulp.src('src/*.html')
  .pipe(gulp.dest('build'));

});

//Читка кэша
gulp.task('clear', function () {
  return cache.clearAll();
})

gulp.task('default', ['watch']);

//Генератор  примесей для адаптивной сетки(Flex)
gulp.task('smartgrid', function () {
    var settings = {
    outputStyle: 'less',
        columns: 12,
            tab: "  ",
         offset: "30px", 
      container: {maxWidth: '1200px', fields: '30px'},
    breakPoints: {
           lg: {
               'width': '1100px', /* -> @media (max-width: 1100px) */
               'fields': '30px' /* side fields */
           },
           md: {
               'width': '960px',
               'fields': '15px'
           },
           sm: {
               'width': '780px',
               'fields': '15px'
           },
           xs: {
               'width': '560px',
               'fields': '15px'
           }
        }
    };
    smartgrid('./src/less/global', settings);
});