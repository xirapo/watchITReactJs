var dirs = require('./global');
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var fs = require('fs');
var compress = require('gulp-compress');

//Webpack
var webpack = require('webpack');
var webpackConf = require('./webpack.config');

//Builder
var nwBuilder = require('nw-builder');
var projectName = 'watchIT';
var platforms = ['linux32', 'linux64', 'osx64', 'win32'];

//WEBPACK
gulp.task("nw:webpack", function (callback) {

    var myConfig = Object.create(webpackConf);
    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        callback();
    });
});


//TODO pasar todo a gulp
//CLEAN
gulp.task('nw:clean', function () {
    return gulp.src(['./release', './build'], {read: false})
        .pipe(clean());
});

//MAKE
gulp.task('nw:mkdir', function () {
    fs.mkdir('./release')
});


gulp.task('nw:compress', function () {
    compress(gulp, options)
});

var nw = (new nwBuilder({
    appName: projectName,
    buildDir: './build',
    //macIcns: './media/img/layout/logo.icns',
    files: dirs.build_dirs,
    platforms: platforms,
    //version: '0.12.3',
    version: '0.22.0',
    zip: false
})).on('log', gutil.log)
    .on('error', gutil.log);

//BUILD
gulp.task('nw:build', function () {
    nw.build()
        .catch(gutil.log);
});


//TASKS
//watch
gulp.task("webpack-watch", ["nw:webpack"], function () {
    gulp.watch(["src/js/**/*"], ["nw:webpack"]);
});

//Sequence runner
gulp.task('build', [
    'nw:clean',
    'nw:build',
    'nw:mkdir'
]);


