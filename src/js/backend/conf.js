/**
 * Handle global settings
 * **/
/////////////////////
//Resource Settings//
/////////////////////

//Torrent conf
module.exports = {
    // Minimum bytes loaded to open video
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
