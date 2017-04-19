/**
 * Created by gmena on 12-12-15.
 */


(function (window) {
    var fs = require('fs');
    var srt2vtt = require('srt2vtt');
    var request = require('http');
    var path = require('path');
    var readline = require('readline');
    //var setting = require(path.resolve() + '/js/backend/settings');

    function Sub() {
    }

    /**
     * Convert from url srt to vtt sub
     * @param {String} url
     * @return {Object}
     */
    Sub.add('urlSrt2VttFile', function (url) {
        if (url) {
            var _filename = url.split('/').pop();
            var _srt_dir = path.join(os.tmpDir(), 'watchIT') + '/' + _filename;
            var _srt_destination = _srt_dir.replace('.srt', '.vtt');


            //The new dir
            return new Promise(function (s, e) {
                //Not srt?
                if (!(~(_srt_dir.indexOf('.srt')))) {
                    s(_srt_dir);
                    return;
                }
                //File system result
                //Exist already subtitle
                try {
                    fs.lstatSync(_srt_destination);
                    //this.srt2vtt(_srt_dir, _srt_destination);
                    s(_srt_destination);
                } catch (e) {
                    //Request sub
                    this.__request2File(url, _srt_dir).then(function () {
                        this.srt2vtt(_srt_dir, _srt_destination);
                        s(_srt_destination);
                    }.bind(this)).catch(e);
                }

            }.bind(this));
        }
    });

    /**
     * Parsing srt to vtt sub
     * @param {String} file_dir
     * @param {String} desination
     */
    Sub.add('srt2vtt', function (file_dir, destination) {
        var srtData = fs.readFileSync(file_dir);
        srt2vtt(srtData, function (err, vttData) {
            if (err) throw new Error(err);
            fs.writeFileSync(destination, vttData);
        });
    });

    /**
     * Request for sub file
     * @param {String} url
     * @param {String} desination
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
                });
            })
        });

    });


    window.Sub = new Sub;
    window.SubClass = Sub;

})(window);
