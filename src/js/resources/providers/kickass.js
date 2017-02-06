/**
 * Created by gmena on 12-02-15.
 */

(function (window) {
	var kass = require ('kickass-torrent');

	function Kickass () {}

	Kickass.add ('cleanResult', function (res) {
		if ( res && 'list' in res ) {
			//Truncate results
			res.list.length = Settings.kickassAPI.listTorrents.max_result;

			//Map movies
			return res.list.map (function (curr, index, arr) {
				return {
					hash    : curr.hash,
					seeds   : curr.seeds,
					title   : curr.title,
					torrent    : curr.torrentLink,
					leechs  : curr.leechs,
					category: curr.category
				};
			})
		}

		return [];
	});

	Kickass.add ('getTorrentBySearch', function (query) {
		var req = {
			url    : Settings.kickassAPI.listTorrents.url,
			q      : query,
			field  : 'seeders',
			order  : 'desc',
			page   : 0,
			timeout: 10000
		};

		return new Promise (function (resolve, error) {
			kass (req, function (e, data) {
				if ( e ) {
					error (e);
				}

				resolve (this.cleanResult (data))
			}.bind (this))
		}.bind (this));

	});

	window.Kickass = new Kickass;
	window.KickassClass = Kickass;

}) (window);