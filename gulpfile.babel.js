const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const htmlReplace = require('gulp-html-replace');
const htmlMin = require('gulp-htmlmin');
const del = require('del');
const sequence = require('run-sequence');
const babel = require('gulp-babel');

const config = {
  dist: 'docs/',
  src: 'src/',
  cssin: 'src/css/**/*.css',
  jsin: 'src/js/**/*.js',
  imgin: 'src/assets/**/*.{jpg,jpeg,png,gif}',
  htmlin: 'src/*.html',
  scssin: 'src/scss/**/*.scss',
  cssout: 'docs/css/',
  jsout: 'docs/js/',
  imgout: 'docs/assets/',
  htmlout: 'docs/',
  scssout: 'src/css/',
  cssoutname: 'style.css',
  jsoutname: 'script.js',
  cssreplaceout: 'css/style.css',
  jsreplaceout: 'js/script.js',
};

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('serve', ['sass'], () => {
  browserSync({
    server: config.src,
  });

  gulp.watch([config.htmlin, config.jsin], ['reload']);
  gulp.watch(config.scssin, ['sass']);
});

gulp.task('sass', () =>
  gulp
    .src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 3 versions'],
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scssout))
    .pipe(browserSync.stream())
);

gulp.task('css', () =>
  gulp
    .src(config.cssin)
    .pipe(concat(config.cssoutname))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssout))
);

gulp.task('js', () =>
  gulp
    .src(config.jsin)
    .pipe(concat(config.jsoutname))
    .pipe(
      babel({
        presets: ['env'],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(config.jsout))
);

gulp.task('img', () =>
  gulp
    .src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout))
);

gulp.task('html', () =>
  gulp
    .src(config.htmlin)
    // .pipe(
    //   htmlReplace({
    //     css: config.cssreplaceout,
    //     js: config.jsreplaceout,
    //   })
    // )
    .pipe(
      htmlMin({
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest(config.dist))
);

gulp.task('clean', () => del([config.dist]));

gulp.task('build', () => {
  sequence('clean', ['html', 'js', 'css', 'img']);
});

gulp.task('default', ['serve']);
