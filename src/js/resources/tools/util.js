/**
 * Created by gmena on 12-12-15.
 */


(function (window) {


	function Util() {
	}

	/**
	 * Encode Base64
	 * @param {Object} data
	 * @returns {String}
	 * */
	Util.add('toBase64', function (data) {
		return ((new Buffer(data || '', 'utf8')).toString('base64'));
	});

	/**
	 * Decode Base64
	 * @params {Object} data
	 * @returns {String}
	 * */
	Util.add('fromBase64', function (data) {
		return new Buffer(data, 'base64').toString()
	});


	window.Util = new Util;
	window.UtilClass = Util;

})(window);
