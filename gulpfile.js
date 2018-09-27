var gulp = require('gulp'),
    concat = require('gulp-concat'), // Склейка файлов
    autoprefixer = require('gulp-autoprefixer'), //Autoprefixer
    csso = require('gulp-csso'), // Минификация CSS
    sass = require('gulp-sass'), // Конверстация SASS (SCSS) в CSS
    browserSync = require('browser-sync'), // BrowserSync
    plumber = require('gulp-plumber'), // Не обрываться при ошибках
    sourcemaps = require('gulp-sourcemaps'), //Source maps
    // replace = require('gulp-replace'),
    rename = require('gulp-rename');


//sass
gulp.task('sass', function () {
    gulp.src('scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())   //не обрывается при ошибках
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        //.pipe(replace('/assets/images/', '/images/'))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
});

//Browser-sync
gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./"
        },
        open: true,
        notify: false
    })
});

gulp.task('watch', ["browser-sync"], function () {
    gulp.watch('scss/*', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('build', ['sass']); //собрать стили
gulp.task('default', ['build', 'watch']);