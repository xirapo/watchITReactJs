/**
 * Created by gmena on 04-21-16.
 */
module.exports = {
    build_dirs: [
        './src/css/**',
        '!./src/css/**/*.scss',
        '!./src/css/app/**',
        '!./src/css/tools/**',
        './src/media/**',
        './src/js/**',
        '!./assets/**',
        '!./tmp/**',
        '!./cache/**',
        '!./build/**',
        './language/**',
        './node_modules/**',
        '!./node_modules/grunt*/**',
        '!./node_modules/gulp*/**',
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