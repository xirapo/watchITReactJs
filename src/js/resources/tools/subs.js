/**
 * Created by gmena on 12-12-15.
 */

(function (window) {
    var fs = require('fs');
    //var srt2vtt = require('srt-to-vtt');
    //var srt2vtt = require('srt2vtt');
    var srt2vtt = require('srt-to-vtt');
    var request = require('http');
    var path = require('path');
    var readline = require('readline');
    var unzip = require('unzip');
    //var setting = require(path.resolve() + '/js/backend/settings');

    function Sub() {
    }

    /**
     * Convert from url srt to vtt sub
     * @param {String} url
     * @return {Object}
     */
    Sub.add('urlSrt2VttFile', function (url) {
        var _filename = url.split('/').pop();
        var _srt_file_dir = ROOT_TMP_FOLDER + '/' + _filename;

        //Append filename
        if (!(~(_filename.indexOf('.zip')))) {
            _srt_file_dir += '.zip';
        }

        //The new dir
        return new Promise(function (s, e) {
            this.__request2File(url, _srt_file_dir).then(function () {
                this.unzipSub(_srt_file_dir).then(function (unzipped_srt) {
                    this.srt2vtt(unzipped_srt)
                        .then(function (vtt_result_file) {
                            s(vtt_result_file.replace(ROOT_DIR, ''))
                        });

                }.bind(this));
            }.bind(this)).catch(e);

        }.bind(this));
    });

    /**
     * Parsing srt to vtt sub
     * @param {String} file_dir
     * @param {String} desination
     */
    Sub.add('srt2vtt', function (srt_file_dir) {
        return (new Promise(function (r, e) {
            //The new vtt file
            var _new_vtt_file_dir = srt_file_dir
                .replace('.srt', '.vtt');

            // var srtData = fs.readFileSync(srt_file_dir);
            // srt2vtt(srtData, function (err, vttData) {
            //     if (err) throw new Error(err);
            //     fs.writeFileSync(_new_vtt_file_dir, vttData);
            //     r(_new_vtt_file_dir);
            // });

            //Converting
            fs.createReadStream(srt_file_dir)
                .pipe(srt2vtt())
                .pipe(
                    fs.createWriteStream(
                        _new_vtt_file_dir
                    )
                );

            //Good
            r(_new_vtt_file_dir);

        }));
    });

    /**
     * Parsing srt to vtt sub
     * @param {String} file_dir
     * @param {String} desination
     */
    Sub.add('unzipSub', function (file_dir) {

        return (new Promise(function (r, e) {
            fs.createReadStream(file_dir)
                .pipe(unzip.Parse())
                .on('entry', function (entry) {
                    if ((~(entry.path.indexOf('.srt')))) {
                        var _result_file_dir = ROOT_TMP_FOLDER + '/' + entry.path.replace(/\s/g, "_")
                                .replace(/\[/g, '')
                                .replace(/\-/g, '')
                                .replace(/\./g, '_')
                                .replace('_srt', '.srt');

                        //Write
                        entry.pipe(
                            fs.createWriteStream(_result_file_dir,
                                {
                                    defaultEncoding: 'iso-8859-1'
                                }
                            )
                        );

                        //Written
                        r(_result_file_dir)
                    }
                });
        }))
    });

    /**
     * Request for sub file
     * @param {String} url
     * @param {String} _srt_dir
     */
    Sub.add('__request2File', function (url, _srt_dir) {
        return new Promise(function (resolve, error) {
            //Read the file
            var _file = fs.createWriteStream(_srt_dir);

            //Read and write file
            request.get(url, function (res) {
                res.pipe(_file);
                _file.on('finish', function () {
                    _file.close(resolve);  // close() is async, call cb after close completes.
                }.bind(this));
            }.bind(this))
        });

    });


    window.Sub = new Sub;
    window.SubClass = Sub;

})(window);
