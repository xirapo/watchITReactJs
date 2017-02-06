/**
 * Created by gmena on 12-02-15.
 */

//Request
var os = os = require('os'),
    path = require('path'),
    http = require('http'),
    request = require('request'),
    setting = require(path.resolve() + '/js/backend/settings');

////Caching requests
//request = require('cached-request')(request);
//request.setCacheDirectory(path.join(os.tmpDir(), 'watchIT'));

//Export YTS
module.exports = {
    'retryInterval': null,
    'retryCount': 0,
    'cleanMovies': function (movies) {

        //Clear interval if exist
        if (this.retryInterval) {
            this.retryCount = 0;
            clearTimeout(this.retryInterval);
        }

        //Has movies?
        movies = movies
            && ((typeof movies.data !== 'undefined' && 'movies' in movies.data && movies.data.movies)
            || (typeof movies.data !== 'undefined' && 'movie' in movies.data && [movies.data.movie]))
            || [];

        //Map movies
        return movies.map(function (curr, index, arr) {
            return {
                id: curr.id,
                title: curr.title,
                imdb_code: curr.imdb_code,
                rating: curr.rating,
                rate: curr.mpa_rating,
                year: curr.year,
                runtime: curr.runtime,
                summary: curr.summary,
                genres: curr.genres,
                trailer: curr.yt_trailer_code,
                description_full: curr.description_full,
                small_cover_image: curr.small_cover_image,
                medium_cover_image: curr.medium_cover_image,
                large_cover_image: curr.large_cover_image,
                torrents: curr.torrents
            };
        })

    },

    '__retry': function (callback, err) {
        //Count intervals
        ++this.retryCount;
        //Clean interval
        if (this.retryInterval) {
            clearTimeout(this.retryInterval);
            //If overhead retry
            if (this.retryCount > setting.ytsAPI.max_retry) {
                this.retryCount = 0;
                return err();
            }
        }

        console.log('Retrying...' + this.retryCount);
        //Create interval
        this.retryInterval = setTimeout(
            callback, setting.ytsAPI.max_retry_interval
        );
    },

    '__request': function (req, success, error) {
        //var agent = new http.Agent();
        //agent.maxSockets = 1000000;
        //http.request({agent:agent});

        //Cache timeout
        req['gzip'] = true;
        req['jar'] = true;
        req['json'] = true;
        req['forever'] = true;
        req['pool'] = {
            maxSockets: 10000
        };
        //req['followRedirect'] = true;
        //req['maxRedirect'] = 10;
        //Request
        request(req, function (err, res, data) {
            if (!err && res.statusCode == 200) {
                //Needed incoming data
                if (!data || typeof data.data == 'undefined' || data.status == 'error') {
                    //Retry get movies
                    this.__retry(function () {
                        this.__request(req, success, error);
                    }.bind(this), error);
                    return;
                }

                //Resolve, movies clean
                success(data);
            } else {
                //Retry get movies
                this.__retry(function () {
                    this.__request(req, success, error);
                }.bind(this), error);
            }
        }.bind(this))
    },

    /** Return list of movies filtered
     *
     * @param {Object} options
     * @returns {Object}
     */
    'getMovies': function (options) {
        //Api YTS URL
        var req = {
            uri: setting.ytsAPI.listMovies,
            timeout: setting.ytsAPI.timeout,
            qs: options
        };

        return new Promise(function (resolve, error) {
            //Handle request
            this.__request(req, function (data) {
                resolve(this.cleanMovies(data));
            }.bind(this), error);

        }.bind(this));

    },

    'getMovieByID': function (id) {
        var req = {
            uri: setting.ytsAPI.listMoviesDetails,
            timeout: setting.ytsAPI.timeout,
            qs: {movie_id: id}
        };

        var _prev = (new Date()).getTime();
        return new Promise(function (resolve, error) {
            //Handle request
            this.__request(req, function (data) {
                console.log('request complete after: ' + (((new Date()).getTime() - _prev) / 60) + ' segundos');
                resolve(this.cleanMovies(data).pop());
            }.bind(this), error);
        }.bind(this));

    }
};
