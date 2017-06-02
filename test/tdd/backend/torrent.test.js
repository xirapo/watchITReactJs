/**
 * Created by gmena on 06-02-17.
 */
import isjs from 'is_js'
import settings from 'backend/torrent.js'

describe('Torrents Settings Object', ()=> {

    (function (settings) {
        let _attr = [
            'MAX_CACHE_REQUEST_TIMEOUT',
            'MAX_NUM_CONNECTIONS',
            'MIN_PERCENTAGE_LOADED',
            'MIN_SIZE_LOADED',
            'MAGNET_RESOLVE_TIMEOUT'
        ];

        for (let x in _attr) {
            it('has valid "' + _attr[x] + '" defined', ()=> {
                expect(_attr[x] in settings).toBe(true, 'valid "' + _attr[x] + '" property needed');
                expect(isjs.number(settings[_attr[x]]) && settings[_attr[x]] > 0)
                    .toBe(true, 'greater than 0 valid "' + _attr[x] + '" number needed')
            });
        }
    })(settings);


    it('has valid "TORRENT_TRACKERS" property defined', ()=> {
        expect('TORRENT_TRACKERS' in settings).toBe(true, 'valid "TORRENT_TRACKERS" property needed');
        expect(isjs.array(settings.TORRENT_TRACKERS) && settings.TORRENT_TRACKERS.length > 0)
            .toBe(true, 'valid "TORRENT_TRACKERS" array needed')
    });


});