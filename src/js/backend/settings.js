/**
 * Handle global settings
 * **/
var Settings = {};
var path = require('path');
var os = require('os');

Settings.system = {
    // Minimum bytes loaded to open video
    MAX_HOME_MOVIES: 30,
    MAX_CACHE_REQUEST_TIMEOUT: 3600000 * 24, // Milliseconds 24h
    MAX_NUM_CONNECTIONS: 100, //Max num of peers 100
    MIN_PERCENTAGE_LOADED: 0.5, //Min % of loaded size
    MIN_SIZE_LOADED: 10 * 1024 * 1024, //Min size loaded
    MAGNET_RESOLVE_TIMEOUT: 60 * 1000, //Engine destroy timeout resolving magnet,
    TORRENT_TRACKERS: ['udp://open.demonii.com:1337/announce',
        'udp://tracker.openbittorrent.com:80',
        'udp://tracker.coppersurfer.tk:6969',
        'udp://glotorrents.pw:6969/announce',
        'udp://tracker.opentrackr.org:1337/announce',
        'udp://torrent.gresille.org:80/announce',
        'udp://p4p.arenabg.com:1337',
        'udp://tracker.leechers-paradise.org:6969'
    ]
};


Settings.network = {
    ws_url: 'ws://localhost:9600',
    //ws_url: 'ws://api.witth.me:9600',
    my_channel: 'client_channel',
    movie_channel: 'movies_channel_'
};

/////////////////////
//Users Settings//
/////////////////////
Settings.custom = {
    clearCache: false
};


/////////////////////
//Resource Settings//
/////////////////////
//TODO esto sera pasado al indexador principal de watchit
// Settings.tvAPI = {
//     cache_timeout: 10000000, // Request cache timeout
//     timeout: 10000, // Request timeout
//     max_retry: 5, // Max retry
//     max_retry_interval: 4000, // Interval time to retry get data from yts
//
//     //The yts end points
//     listTvDetails: 'http://api-fetch.website/tv/show/',
//     listTv: 'http://api-fetch.website/tv/shows/'
// };

//YTS Api
//TODO esto sera pasado al indexador principal de watchit
Settings.ytsAPI = {
    cache_timeout: 10000000, // Request cache timeout
    timeout: 10000, // Request timeout
    max_retry: 5, // Max retry
    max_retry_interval: 4000, // Interval time to retry get data from yts

    //The yts end points
    listMoviesDetails: 'https://yts.ag/api/v2/movie_details.json',
    listMovies: 'https://yts.ag/api/v2/list_movies.json'
};

//Open Subtitles
Settings.openSub = {
    cache_timeout: 10000000,
    encode: 'utf8',
    useragent: 'happy_screen',
    username: "gmena",
    password: "gmena5289"
};

//WatchIt API
Settings.wtAPI = {
    timeout: 10000, // Request timeout,
    cache_timeout: 10000000, // Request cache timeout,
    root: 'http://127.0.0.1:8000/api/v1',
    auth: 'http://127.0.0.1:8000/api/v1/auth/',
    user_me: 'http://127.0.0.1:8000/api/v1/user/',
    playlist: 'http://127.0.0.1:8000/api/v1/playlist/',
    search: 'http://127.0.0.1:8000/api/v1/movies/search/'
};

// Settings.wtAPI = {
//     timeout: 10000, // Request timeout,
//     cache_timeout: 10000000, // Request cache timeout,
//     root: 'http://api.witth.me/',
//     auth: 'http://api.witth.me/auth/',
//     user_me: 'http://api.witth.me/user/me/',
//     playlist: 'http://api.witth.me/playlist/',
//     search: 'http://api.witth.me/movies/search/'
// };


if (typeof module !== 'undefined') {
    module.exports = Settings;
} else {
    //Global
    window.Settings = Settings;
}


