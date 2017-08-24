/**
 * Handle global settings
 * **/
var Settings = {};

/////////////////////
//////Uri Conf///////
/////////////////////

Settings.loginView = '/';
Settings.appView = '/app';
//Remote host settings
Settings.remote = {
    ws_host: 'ws://localhost:9600',
    //api_host: 'http://127.0.0.1:8000/api'
    api_host: 'http://api.witth.me'
};


/////////////////////
//Resource Settings//
/////////////////////

//WatchIt WebSocket
// Settings.ws = {
//     ws_url: Settings.remote.ws_host,
//     my_channel: 'client_channel',
//     movie_channel: 'movies_channel_'
// };

//Avoid bad indexing
if ('remote' in Settings)
//WatchIt API
    Settings.api = {
        timeout: 10000, // Request timeout milliseconds,
        cache_time: 60, // cache expire minutes
        step: 50,//Step by scroll load
        offset: 1, //Default start offset
        //Uri list
        root: Settings.remote.api_host + '/v1/',
        auth: Settings.remote.api_host + '/v1/auth/',
        user: Settings.remote.api_host + '/v1/user/',
        movies: Settings.remote.api_host + '/v1/movies/',
        search: Settings.remote.api_host + '/v1/search/'
    };

//Subs conf
Settings.subs = {
    available: [
        'spanish', 'english'
    ]
};

export default Settings;

