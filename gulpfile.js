var fs = require('fs');
var dirs = require('./global');
var gulp = require('gulp');
var gutil = require('gulp-util');
var flatten = require('gulp-flatten');
var clean = require('gulp-clean');

//Webpack
var webpack = require('webpack');
var webpackConf = require('./webpack.config');

//Builder
var nwBuilder = require('nw-builder');
var nwVersion = '0.22.0';
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


//CLEAN OLD DIRS
gulp.task('nw:clean', function () {
    return gulp.src(['./build'], {read: false})
        .pipe(clean());
});

//COPY ASSETS
gulp.task('nw:copy', function () {
    //The complete directory to replace file
    var _dest = {
        osx: 'watchIT.app/Contents/Versions/58.0.3029.81/nwjs Framework.framework/',
        win: '', linux: 'lib/'
    }, _src = {
        osx: 'libffmpeg.dylib',
        win: 'ffmpeg.dll',
        linux: 'libffmpeg.so'
    };

    //Reduce
    return platforms.map(function (os, i, arr) {
        //From-to
        var src = './assets/' + nwVersion + '/' + os + '/' + _src[os.slice(0, -2)];
        var destination = './build/' + projectName + '/' + os + '/' + _dest[os.slice(0, -2)];
        var filename = _src[os.slice(0, -2)];

        //If file exist. Remove it;
        if (fs.existsSync(destination + filename)) {
            fs.unlinkSync(destination + filename);
        }

        //Remove destination first
        gulp.src(src)
            .pipe(flatten({includeParents: 0}))
            .pipe(gulp.dest(destination));
    });

});


//BUILD APP
var nw = new nwBuilder({
    appName: projectName,
    buildDir: './build',
    files: dirs.build_dirs,
    platforms: platforms,
    version: nwVersion,
    zip: false
});


gulp.task('nw:build', ['nw:clean'], function () {
    nw.build().then(function () {
        gulp.start('nw:copy');
    }).catch(gutil.log);
});


//TASKS
//watch
gulp.task("webpack-watch", ["nw:webpack"], function () {
    gulp.watch(["src/js/**/*"], ["nw:webpack"]);
});

//Sequence runner
gulp.task('build', [
        'nw:clean',
        'nw:build'
    ]
);


