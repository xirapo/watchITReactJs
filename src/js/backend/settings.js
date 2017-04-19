/**
 * Handle global settings
 * **/
var Settings = {};
var path = require('path');
var os = require('os');

Settings.loginView = '/index.html';
Settings.appView = '/src/app.html';

/////////////////////
//Users Settings//
/////////////////////
Settings.custom = {
    clearCache: false
};

/////////////////////
//Resource Settings//
/////////////////////

//Torrent conf
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


Settings.ws = {
    ws_url: 'ws://localhost:9600',
    //ws_url: 'ws://api.witth.me:9600',
    my_channel: 'client_channel',
    movie_channel: 'movies_channel_'
};


//WatchIt API
Settings.api = {
    timeout: 10000, // Request timeout,
    root: 'http://127.0.0.1:8000/api/v1/',
    auth: 'http://127.0.0.1:8000/api/v1/auth/',
    user: 'http://127.0.0.1:8000/api/v1/user/',
    playlist: 'http://127.0.0.1:8000/api/v1/playlist/',
    search: 'http://127.0.0.1:8000/api/v1/movies/search/'
};

export default Settings;

