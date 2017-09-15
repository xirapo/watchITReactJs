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
        movies: Settings.remote.api_host + '/v1/movies/',
        search: Settings.remote.api_host + '/v1/search/'
    };

//Subs conf
Settings.subs = {
    available: [
        'spanish', 'english'
    ]
};

//Resolution conf
Settings.resolutions = {
    available: [
        '720p', '1080p'
    ]
};

//New timezone needed
Settings.appendTimeZones = [
    'America/Managua|MMT CST EST CDT|5J.c 60 50 50|0121313121213131|-1quie.M 1yAMe.M 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5'
];

//Default user settings
Settings.user = {
    timezone: 'American/Managua',
    max_old_chats: 50
};

export default Settings;

