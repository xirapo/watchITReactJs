/**
 * Handle global settings
 * **/
var Settings = {};
var path = require('path');
var os = require('os');


/////////////////////
//////Uri Conf///////
/////////////////////

Settings.loginView = '/';
Settings.appView = '/app';
//Remote host settings
Settings.remote = {
    ws_host: 'htt://localhost:9600',
    api_host: 'http://127.0.0.1:8000'
};


/////////////////////
//Resource Settings//
/////////////////////

//WatchIt WebSocket
Settings.ws = {
    ws_url: Settings.remote.ws_host,
    my_channel: 'client_channel',
    movie_channel: 'movies_channel_'
};

//WatchIt API
Settings.api = {
    timeout: 10000, // Request timeout,
    root: Settings.remote.api_host + '/api/v1/',
    auth: Settings.remote.api_host + '/api/v1/auth/',
    user: Settings.remote.api_host + '/api/v1/user/',
    movies: Settings.remote.api_host + '/api/v1/movies/',
    search: Settings.remote.api_host + '/api/v1/search/'
};

export default Settings;

