﻿/// <reference path="node_modules/bootstrap-material-design/dist/js/material.min.js" />
/// <binding BeforeBuild='default' />
/// <reference path="node_modules/ng2-toastr/bundles/ng2-toastr.min.js" />
/// <reference path="node_modules/ng2-pagination/dist/ng2-pagination-bundle.js" />


"use strict";

var _ = require('lodash'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

var angularJs = [
    './node_modules/angular2/bundles/angular2.dev.js',
    './node_modules/angular2/bundles/router.dev.js',
    './node_modules/angular2/bundles/angular2-polyfills.js',
    './node_modules/angular2/bundles/http.dev.js',
];

var jasmineJs = [
    './node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
    './node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
    './node_modules/jasmine-core/lib/jasmine-core/boot.js',
];

var js = [
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/systemjs/dist/system.js',
    './node_modules/rxjs/bundles/Rx.js',
    './node_modules/typescript/lib/typescript.js',
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap-material-design/dist/js/material.min.js',
    './node_modules/bootstrap-material-design/dist/js/ripples.min.js',
    './node_modules/ng2-toastr/bundles/ng2-toastr.js',
    './node_modules/primeui/primeui-ng-all.js',
    './node_modules/ng2-bs3-modal/bundles/ng2-bs3-modal.min.js',
    "./node_modules/ng2-uploader/bundles/ng2-uploader.js",
    "./node_modules/angular2-jwt/angular2-jwt.js",
    "./node_modules/ng2-pagination/dist/ng2-pagination-bundle.js"
];

var css = [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/jasmine-core/lib/jasmine-core/jasmine.css',
    './node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
    './node_modules/bootstrap-material-design/dist/css/ripples.min.css',
    './node_modules/ng2-toastr/bundles/ng2-toastr.min.css',
    './node_modules/primeui/primeui-ng-all.min.css',
];

var fonts = [
    './node_modules/bootstrap/dist/fonts/*.*'
];

gulp.task('copy-js', function () {
    _.forEach(js, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/js'))
    });
    _.forEach(angularJs, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/js/angular2'))
    });
    _.forEach(jasmineJs, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/js/jasmine'))
    });
});

gulp.task('copy-min-js', function () {
    _.forEach(js, function (file, _) {
        gulp.src(file)
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest('./wwwroot/js'))
    });
    _.forEach(angularJs, function (file, _) {
        gulp.src(file)
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest('./wwwroot/js/angular2'))
    });
});

gulp.task('copy-css', function () {
    _.forEach(css, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/css'))
    });
    _.forEach(fonts, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/fonts'))
    });
});

gulp.task('copy-min-css', function () {
    _.forEach(css, function (file, _) {
        gulp.src(file)
            .pipe(cssmin())
            .pipe(rename({ extname: '.min.css' }))
            .pipe(gulp.dest('./wwwroot/css'))
    });
    _.forEach(fonts, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/fonts'))
    });
});

gulp.task('default', ['copy-js', 'copy-css']);
gulp.task('minify', ['copy-min-js', 'copy-min-css']);