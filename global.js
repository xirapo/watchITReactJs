/**
 * Created by gmena on 04-21-16.
 */
module.exports = {
    build_dirs: [
        './src/css/**',
        '!./src/css/**/*.scss',
        '!./src/css/**/*.map',
        '!./src/css/app/**',
        '!./src/css/tools/**',
        './src/media/**',
        './src/js/**',
        '!./assets/**',
        '!./tmp/**',
        '!./test/**',
        '!./cache/**',
        '!./build/**',
        './language/**',
        './node_modules/**',
        '!./node_modules/gulp*/**',
        '!./node_modules/webpack*/**',
        '!./node_modules/babel*/**',
        '!./node_modules/nw-builder/**',
        '!./node_modules/**/Makefile',
        '!./node_modules/**/*.bin',
        '!./node_modules/**/*.c',
        '!./node_modules/**/*.h',
        './index.html',
        '!./**/build/**',
        '!./**/doc*/**',
        './package.json',
        './README.md'
    ]
};