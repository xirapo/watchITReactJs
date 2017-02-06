var dirs = require('./global');
var gulp = require('gulp');
var gutil = require('gulp-util');
//Webpack
var WebpackDevServer = require("webpack-dev-server");
var webpack = require('webpack');
var webpackConf = require('./webpack.config');
var NwBuilder = require('nw-builder');

//var runSequence = require('run-sequence');
//var del = require('del');

gulp.task("nw:webpack-watch", ["nw:webpack"], function() {
    gulp.watch(["src/js/**/*"], ["nw:webpack"]);
});

//Webpack
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


gulp.task("nw:webpack-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConf);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8000, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});


//Build
var projectName = 'watchIT';
var platforms = ['linux32', 'linux64', 'osx32', 'osx64', 'win32', 'win64'];
var nw = new NwBuilder({
    appName: projectName,
    buildDir: './build',
    //macIcns: './media/img/layout/logo.icns',
    files: dirs.build_dirs,
    platforms: platforms,
    version: '0.12.3',
    zip: false
}).on('log', gutil.log).on('error', gutil.log);


gulp.task('nw:build', function () {
    nw.build().catch(gutil.log);
});



