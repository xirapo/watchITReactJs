// Opens a streaming torrent client
// gmena
(function (window) {

    var path = require('path');
    var peerflix = require('peerflix');
    var parseTorrent = require('read-torrent');
    var setting = require(path.resolve() + '/src/js/backend/torrent');

    function TorrentStreamer() {
        this.flix = null;
        this.loadedTimeout = null;
        this.stopped = false;

    }

    /**Stop torrent streaming
     * @param {function} callback
     * */
    TorrentStreamer.add('stopTorrent', function (callback) {

        //Loading timeout stop
        if (this.loadedTimeout) {
            clearTimeout(this.loadedTimeout)
        }

        //If flix
        if (this.flix) {
            //Destroy peers
            this.flix.destroy();
            this.flix.server.close(function () {
                delete this.flix;
            }.bind(this));
        }

        //Stopped
        this.stopped = true;
        typeof callback === 'function'
        && callback.call(this);


    });

    /**Check for progress in torrent download
     * @param {object} flix
     * @param {string} href
     * @param {function} callback
     * @param {function} progressCallback
     * @return void
     * */
    TorrentStreamer.add('checkLoadingProgress', function (flix, callback, progressCallback) {

        var total = flix.fileSize;
        var swarm = flix.swarm;
        var state = 'Connecting';
        var downloaded = swarm.downloaded;


        // There's a minimum size before we start playing the video.
        var targetLoadedSize = setting.MIN_SIZE_LOADED > total ? total : setting.MIN_SIZE_LOADED;
        var targetLoadedPercent = setting.MIN_PERCENTAGE_LOADED * total / 100.0;
        var targetLoaded = Math.max(targetLoadedPercent, targetLoadedSize);
        var percent = downloaded / targetLoaded * 100.0;

        if ((downloaded > setting.MIN_SIZE_LOADED || swarm.cachedDownload > setting.MIN_SIZE_LOADED)
        ) {
            if (typeof callback === 'function') {
                callback.call(this, flix.href, flix);
            }
        } else {
            if (downloaded || swarm.piecesGot > 0) {
                state = 'Downloading';
            } else if (swarm.wires.length) {
                state = 'Starting Download';
            }

            typeof progressCallback == 'function' ? progressCallback.call(this, flix, percent, state) : null;
            this.loadedTimeout = setTimeout(function () {
                this.checkLoadingProgress(flix, callback, progressCallback)
            }.bind(this), 500);
        }

    });


    /** Start playing torrent
     * @param {string} torrent
     * @param {function} callback
     * @param {function} progressCallback
     * @return object
     * * */

    TorrentStreamer.add('playTorrent', function (torrent, callback, progressCallback, errorCallback) {
        //Reset stopped on each new play
        this.stopped = false;
        //Handle remote torrent
        parseTorrent(torrent, function (err, torrent) {
            if (err || !torrent) {
                console.log('Error loading torrent');
                console.log(torrent);
                console.log(err);
                errorCallback(err);
                return;
            }

            //Don't connect, if stop was triggered
            if (this.stopped) {
                console.log('stopped');
                return;
            }

            // Streamer
            // Create a unique file to cache the video (with a microtimestamp) to prevent read conflicts
            var tmpFilename = torrent.infoHash;
            var tmpFile;

            tmpFilename = tmpFilename.replace(/([^a-zA-Z0-9-_])/g, '_');
            tmpFile = path.join(ROOT_TMP_FOLDER, tmpFilename);

            //Active
            //Starting streaming
            //Streamer!!
            this.flix = peerflix(torrent, {
                // Set the custom temp file
                path: tmpFile,
                dht: true || 50,
                tracker: true,
                verify: true,
                //port: 554,
                trackers: setting.TORRENT_TRACKERS,
                buffer: (1.5 * 1024 * 1024).toString(),
                tmp: ROOT_TMP_FOLDER,
                name: torrent.infoHash,
                connections: setting.MAX_NUM_CONNECTIONS
            });

            this.flix.swarm.piecesGot = 0;
            this.flix.swarm.cachedDownload = 0;
            this.flix.fileSize = 0; // The file selected size
            this.flix.pathToFile = null; // The path to the file
            this.flix.href = null; // The href link

            this.flix.on('verify', function (index) {
                if (this.flix) {
                    this.flix.swarm.piecesGot += 1;
                }
            }.bind(this));

            //Server listening
            this.flix.server.on('listening', function () {
                if (this.flix) {
                    var selectedFile = this.flix.torrent.files.reduce(function (biggest, file) {
                        return biggest.length > file.length ? biggest : file;
                    });

                    this.flix.fileSize = selectedFile.length;
                    this.flix.pathToFile = tmpFile + '/' + selectedFile.path;
                    this.flix.href = 'http://127.0.0.1:' + this.flix.server.address().port + '/';

                    //Clear old timeout
                    this.loadedTimeout ? clearTimeout(this.loadedTimeout) : null;
                    this.checkLoadingProgress(this.flix, callback, progressCallback);
                }
            }.bind(this));

            // piecesGot before ready means the cache we already have
            this.flix.on('ready', function () {
                if (this.flix) {
                    this.flix.swarm.cachedDownload = this.flix.swarm.piecesGot
                        * (this.flix.torrent.pieceLength || 0);
                }
            }.bind(this));

        }.bind(this));

        //Return reference to Streamer
        return this;
    });


    window.Streamer = new TorrentStreamer;
    window.streamerClass = TorrentStreamer;

})(window);
