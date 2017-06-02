/**
 * Created by gmena on 06-02-17.
 */
var webpack_ = require('./webpack.config.js');
var path = require('path');

module.exports = function (config) {
    config.set({
            // Base path, that will be used to resolve files and exclude
            basePath: './test/',
            frameworks: ['jasmine'],
            // List of files / patterns to load in the browser
            files: [
                'tdd/*/*.test.js'
            ],
            // List of files to exclude
            exclude: [],
            preprocessors: {
                'tdd/*/*.test.js': ['webpack']
            },
            webpack: {
                module: webpack_['module'],
                resolve: webpack_['resolve']
            },
            // Use dots reporter, as travis terminal does not support escaping sequences
            // possible values: 'dots', 'progress'
            // CLI --reporters progress
            reporters: ['progress', 'junit'],
            junitReporter: {
                // Will be resolved to basePath (in the same way as files/exclude patterns)
                outputFile: 'test-results.xml'
            },

            // Web server port
            // CLI --port 9876
            port: 9876,
            // Enable / disable colors in the output (reporters and logs)
            // CLI --colors --no-colors
            colors: true,

            // Level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            // CLI --log-level debug
            logLevel: config.LOG_INFO,
            // Enable / disable watching file and executing tests whenever any file changes
            // CLI --auto-watch --no-auto-watch
            autoWatch: true,
            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera
            // - Safari (only Mac)
            // - PhantomJS
            // - IE (only Windows)
            // CLI --browsers Chrome,Firefox,Safari
            browsers: [
                'PhantomJS', //Webckit
                'SlimerJS' //Gecko
                // 'Chrome',
                //  'Firefox'
            ],
            // If browser does not capture in given timeout [ms], kill it
            // CLI --capture-timeout 5000
            captureTimeout: 50000,
            // Auto run tests on start (when browsers are captured) and exit
            // CLI --single-run --no-single-run
            singleRun: false,
            // Report which specs are slower than 500ms
            // CLI --report-slower-than 500
            reportSlowerThan: 500,
            plugins: [
                // 'karma-chrome-launcher',
                'karma-jasmine',
                'karma-webpack',
                'karma-sourcemap-loader',
                'karma-junit-reporter',
                'karma-phantomjs-launcher',
                'karma-slimerjs-launcher'
                // 'karma-firefox-launcher'
            ],
            concurrency: 3,
            forceJSONP: true,
            browserStack: {
                project: 'WatchIt'
            }
        }
    )
};