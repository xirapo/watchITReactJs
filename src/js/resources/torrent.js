/**
 * Created by gmena on 12-02-15.
 */

(function (window) {
	var path = require('path');
	var torrentS = require('torrent-stream');
	var readTorrent = require('read-torrent');
	var setting = require(path.resolve() + '/js/backend/settings');

	function TorrentStreamer() {
	}

	/** Valid a file torrent format
	 * @param {string} file name
	 * */
	TorrentStreamer.add('validFormat', function (file) {
		return (/(.*)\.(mp4|mkv)$/g.test(file));
	});

	/** Return the torrent info
	 * @param {string} torrent link
	 * */
	TorrentStreamer.add('handleTorrentLink', function (link) {
		return new Promise(function (res, err) {
			readTorrent(link, function (e, r) {
				if (e) err(e);
				res(r);
			})
		});

	});

	/** Return the torrent file link
	 * @param {string} torrent link
	 * */
	TorrentStreamer.add('handleMagnetLink', function (magnet) {

		var engine = torrentS(magnet, {
			connections: setting.system.MAX_NUM_CONNECTIONS,
			tmp: ROOT_TMP_FOLDER,
			verify: true,
			trackers: setting.system.TORRENT_TRACKERS
		}), cTimeOut =
			//After timeout destroy engine..
			setTimeout(function () {
				engine.destroy();
			}, Settings.system.MAGNET_RESOLVE_TIMEOUT);

		//Handle magnet!!
		return new Promise(function (res, err) {
			engine.on('ready', function () {
				var _path = engine.path;
				//Ready, magnet handled
				clearTimeout(cTimeOut);

				//path to torrent?
				if (_path) {
					res(_path + '.torrent');
				} else {
					err();
				}

				engine.destroy();
				engine = null;

			});
		});

	});

	/** Return the link type
	 * @param {string} torrent link
	 * */
	TorrentStreamer.add('getType', function (torrent) {
		if (typeof torrent === 'string') {
			if (torrent.substring(0, 8) === 'magnet:?') {
				return 'magnet';
			}
			if (torrent.indexOf('.torrent') !== -1) {
				if (torrent.indexOf('http://') === 0) {
					return 'torrenturl';
				}
				return 'torrent';
			}
		}
		return 'unknown';
	});


	window.Torrent = new TorrentStreamer;
	window.TorrentClass = TorrentStreamer;

})
(window);