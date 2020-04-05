'use strict';

const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,

    path = {
        build: {
            js: './assets/build/js/',
            style: './assets/build/style/',
            img: './assets/build/img',
        },
        src: {
            js: './assets/src/js/main.js',
            style: './assets/src/style/main.scss',
            img: './assets/src/img/**/*.*',
        },
        watch: {
            js: './assets/src/js/**/*.js',
            style: './assets/src/style/**/*.scss',
            img: './assets/src/img/**/*.*',
        },
        templates: './templates/',
        clean: './assets/build/*',
    },

    server = {
        server: {
            baseDir: './',
        },
    };

gulp.task('browser-sync', function () {
    browserSync.init(server);
    browserSync.watch(path.templates, reload);
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream:true}));
});

gulp.task('style:build', function () {
    console.log('style');
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream:true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream:true}));
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('build', gulp.series('clean',
gulp.parallel('style:build', 'js:build', 'image:build')));

gulp.task('watch', function() {
    watch(path.watch.style, gulp.series('style:build'));
    watch(path.watch.js, gulp.series('js:build'));
    watch(path.watch.img, gulp.series('image:build'));
});

gulp.task('default', gulp.parallel('build', 'watch', 'browser-sync'));
