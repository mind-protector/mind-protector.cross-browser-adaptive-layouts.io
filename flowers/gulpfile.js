'use strict';

const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,

    path = {
        build: {
            js: './app/assets/build/js/',
            style: './app/assets/build/style/',
            layout: './app/templates/',
            img: './app/assets/build/img',
        },
        src: {
            coffee: './app/assets/src/coffee/main.coffee',
            style: './app/assets/src/style/main.scss',
            layout: ['./app/assets/src/layout/**/*.pug', '!./app/assets/src/layout/**/_*.pug'],
            img: './app/assets/src/img/**/*.*',
        },
        watch: {
            coffee: './app/assets/src/coffee/**/*.coffee',
            style: './app/assets/src/style/**/*.scss',
            layout: './app/assets/src/layout/**/*.pug',
            img: './app/assets/src/img/**/*.*',
        },
        templates: './app/templates/',
        clean: './app/assets/build/*',
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

gulp.task('coffee:build', function () {
    gulp.src(path.src.coffee)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(coffee({bare: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream:true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream:true}));
});

gulp.task('layout:build', function () {
    gulp.src(path.src.layout)
        .pipe(sourcemaps.init())
        .pipe(pug({
            //pretty: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.layout))
        .pipe(reload({stream:true}));
})

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
gulp.parallel('style:build', 'layout:build', 'coffee:build', 'image:build')));

gulp.task('watch', function() {
    watch(path.watch.style, gulp.series('style:build'));
    watch(path.watch.layout, gulp.series('layout:build'));
    watch(path.watch.coffee, gulp.series('coffee:build'));
    watch(path.watch.img, gulp.series('image:build'));
});

gulp.task('default', gulp.parallel('build', 'watch', 'browser-sync'));
