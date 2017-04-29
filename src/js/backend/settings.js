/**
 * Handle global settings
 * **/
var Settings = {};
var path = require('path');
var os = require('os');

Settings.loginView = '/';
Settings.appView = '/app';

/////////////////////
//Resource Settings//
/////////////////////

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
    movies: 'http://127.0.0.1:8000/api/v1/movies/',
    search: 'http://127.0.0.1:8000/api/v1/search/'
};

export default Settings;

