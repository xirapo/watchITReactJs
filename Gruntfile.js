module.exports = function (grunt) {
//var buildPlatforms = parseBuildPlatforms(grunt.option('platforms'));
    var version = '1.0.0-alpha';
    var projectName = 'watchIT';
    var platforms = ['linux32', 'linux64', 'osx64', 'win32', 'win64'];

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

    grunt.initConfig({
        exec: {
            gulp: {
                cmd: 'gulp nw:build --force'
            }
        },
        clean: {
            options: {
                force: true
            },
            release: ['./release'],
            build: ['./build']
        },
        mkdir: {
            release: {
                options: {
                    mode: '0777',
                    create: ['./release']
                }
            }
        },
        compress: {
            linux32: {
                options: {
                    mode: 'tgz',
                    archive: './release/' + projectName + '/linux32/wit_linux32-V' + version + '.tar.gz'
                },
                expand: true,
                cwd: './build/' + projectName + '/linux32',
                src: '**',
                dest: projectName
            },
            linux64: {
                options: {
                    mode: 'tgz',
                    archive: './release/' + projectName + '/linux64/wit_linux64-V' + version + '.tar.gz'
                },
                expand: true,
                cwd: './build/' + projectName + '/linux64',
                src: '**',
                dest: projectName
            },
            osx64: {
                options: {
                    mode: 'tgz',
                    archive: './release/' + projectName + '/osx64/wit_osx64-V' + version + '.tar.gz'
                },
                expand: true,
                cwd: './build/' + projectName + '/osx64',
                src: '**',
                dest: projectName
            },
            win: {
                options: {
                    mode: 'tgz',
                    archive: './release/' + projectName + '/win/wit_win-V' + version + '.tar.gz'
                },
                expand: true,
                cwd: './build/' + projectName + '/win32',
                src: '**',
                dest: projectName
            }
        },
        copy: {
            main: {
                files: getCopyDirectories(platforms)
            }
        }
    });

    //grunt.loadNpmTasks('grunt-nw-builder');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.registerTask('default', [
        'clean', 'mkdir', 'exec:gulp:build', 'copy', 'compress'
    ]);

};
