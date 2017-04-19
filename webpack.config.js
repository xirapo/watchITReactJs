var path = require('path');
var webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, 'src/js/front/dist/');
var APP_DIR = path.resolve(__dirname, 'src/js/front');

//Build
module.exports = {
    cache: true,
    entry: {
        index: APP_DIR + '/view/index/init-view/index.jsx',
        app: APP_DIR + '/view/app/init-view/index.jsx'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].bundle.js', // Or [name]
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "react"],
                    plugins: ["transform-object-assign", "transform-object-rest-spread"]

                }
            }
        ]
    },
    resolve: {
        modulesDirectories: [
            'node_modules'
        ]
    }
};