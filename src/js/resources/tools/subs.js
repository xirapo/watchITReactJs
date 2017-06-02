/**
 * Created by gmena on 12-12-15.
 */

(function (window) {
    var fs = require('fs');
    var srt2vtt = require('srt2vtt');
    var iconv = require('iconv-lite');
    var request = require('http');
    var path = require('path');
    var readline = require('readline');
    var charsetDetect = require('jschardet');
    var unzip = require('unzip');

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

        //Append format
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
            //Convert to
            var dataBuff = fs.readFileSync(srt_file_dir);
            var targetEncodingCharset = 'ISO-8859-1';

            //Check for encoding
            var charset = charsetDetect.detect(dataBuff);
            var detectedEncoding = charset.encoding;

            //The srt to latin1 if not windows-* encoding
            var _srt_buffer = !detectedEncoding.startsWith('win') && iconv.encode(
                    iconv.decode(dataBuff, detectedEncoding),
                    targetEncodingCharset
                ) || dataBuff;


            //Converting SRT to VTT
            srt2vtt(_srt_buffer, function (err, vttData) {
                if (err) throw new Error(err);
                fs.writeFileSync(_new_vtt_file_dir, vttData);
                r(_new_vtt_file_dir);
            });

        }));
    });

    /**
     * Unzip sub file
     * @param {String} file_dir
     * @param {String} desination
     */
    Sub.add('unzipSub', function (file_dir) {

        return (new Promise(function (r, err) {
            fs.createReadStream(file_dir)
                .pipe(unzip.Parse())
                .on('entry', function (entry) {

                    //Make dir if needed
                    if (entry.type == 'Directory') {
                        if (!fs.existsSync(ROOT_TMP_FOLDER + '/' + entry.path)) {
                            fs.mkdirSync(ROOT_TMP_FOLDER + '/' + entry.path)
                        }
                    }

                    //If srt file
                    if ((~(entry.path.indexOf('.srt')))) {
                        var _result_file_dir = ROOT_TMP_FOLDER + '/'
                            + entry.path.replace(/(\[|\]|\-|\.|\+|\s)/g, '_')
                                .replace('_srt', '.srt');


                        var _file = fs.createWriteStream(
                            _result_file_dir, {defaultEncoding: 'ISO-8859-1'}
                            //_result_file_dir
                        );

                        _file.on('open', function () {
                            //Write
                            entry.pipe(
                                _file
                            );
                        }).on('finish', function () {
                            //Finish to write

                            _file.close();  // close() is async, call cb after close completes.
                            //Written
                            r(_result_file_dir);
                        }).on('error', function (e) {
                            console.log(e);
                            err(e);
                        });

                    } else {
                        entry.autodrain();
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
