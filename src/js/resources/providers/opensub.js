/**
 * Created by gmena on 12-02-15.
 */

//Request
var path = require('path'),
    OpenSub = require('opensubtitles-api'),
    setting = require(path.resolve() + '/js/backend/settings');


//var OS = new OpenSub('OSTestUserAgent');
var OS = new OpenSub({
    useragent: setting.openSub.useragent,
    username: setting.openSub.username,
    password: setting.openSub.password
});

//Export YTS
module.exports = {

    /** Return subtitle for my movie
     *
     * @param {String} imdb
     * @returns {Object}
     */
    'getSubByIMDB': function (imdb) {
        return new Promise(function (s, e) {
            OS.search({
                extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
                limit: 'best',                 // Can be 'best', 'all' or an// arbitrary nb. Defaults to 'best'
                imdbid: imdb.substr(2)           // 'tt528809' is fine too.
            }).then(function (subs) {
                //Success
                s(subs);

            }).catch(e);
        }.bind(this));
    },
    'getSubByHash': function (hash, size) {
        return new Promise(function (s, e) {
            OS.search({
                extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
                limit: 'best',                 // Can be 'best', 'all' or an// arbitrary nb. Defaults to 'best'
                hash: hash,        // 'hash' is fine too.
                filesize: size               // Number of frames per sec in the video.
            }).then(function (subs) {
                //Success
                s(subs);

            }).catch(e);
        }.bind(this));
    },

    'getSubTV': function (imdb, season, episode) {
        return new Promise(function (s, e) {
            OS.search({
                extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
                limit: 'best',                 // Can be 'best', 'all' or an// arbitrary nb. Defaults to 'best'
                imdbid: imdb.substr(2),        // 'hash' is fine too.
                season: season,              // Number of frames per sec in the video.
                episode: episode
            }).then(function (subs) {
                //Success
                s(subs);

            }).catch(e);
        }.bind(this));
    },
    'getVideoIdentify': function (path) {
        return OS.identify({path: path, extended: true});
    },
    'getVideoInfo': function (path) {
        return OS.extractInfo(path);
    }
};
