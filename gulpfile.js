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
var NwBuilder = require('nw-builder');
var projectName = 'watchIT';
var platforms = ['linux32', 'linux64', 'osx64', 'win32', 'win64'];

//Handle directories
var getCopyDirectories = function (platforms) {

    //THe complete directory to replace file
    var _dest = {
        osx: 'watchIT.app/Contents/Frameworks/nwjs Framework.framework/Libraries/ffmpegsumo.so',
        win: 'ffmpegsumo.dll',
        linux: 'libffmpegsumo.so'
    }, _src = {
        osx: 'ffmpegsumo.so',
        win: 'ffmpegsumo.dll',
        linux: 'libffmpegsumo.so'
    }, _result = [];


    //For each platform!!
    for (var os in platforms) {
        //Check for property!!
        if (platforms.hasOwnProperty(os)) {
            var _os_arch = platforms[os];
            var _os = _os_arch.slice(0, -2);

            _result.push({
                src: './assets/' + _os_arch + '/' + _src[_os],
                dest: './build/' + projectName + '/' + _os_arch + '/' + _dest[_os],
                flatten: true
            })
        }

    }

    _result.push({
        src: 'cache/0.12.3/win32/icudtl.dat',
        dest: 'build/' + projectName + '/win32/icudtl.dat',
        flatten: true
    });

    _result.push({
        src: 'cache/0.12.3/win64/icudtl.dat',
        dest: 'build/' + projectName + '/win64/icudtl.dat',
        flatten: true
    });

    return _result;
};

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



//BUILD
gulp.task('nw:build', function () {
    (new NwBuilder({
        appName: projectName,
        buildDir: './build',
        //macIcns: './media/img/layout/logo.icns',
        files: dirs.build_dirs,
        platforms: platforms,
        //version: '0.12.3',
        version: '0.14.6',
        zip: false
    })).on('log', gutil.log)
        .on('error', gutil.log)
        .build()
        .catch(gutil.log);
});


//TASKS
//watch
gulp.task("webpack-watch", ["nw:webpack"], function () {
    gulp.watch(["src/js/**/*"], ["nw:webpack"]);
});

gulp.task('build', [
    'nw:clean',
    'nw:build',
    'nw:mkdir'
]);


