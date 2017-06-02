/**
 * Created by gmena on 06-02-17.
 */
import settings from 'backend/torrent.js'

describe('Torrents Settings Object', ()=> {

    it('has "MAX_CACHE_REQUEST_TIMEOUT" property defined', ()=> {
        expect('MAX_CACHE_REQUEST_TIMEOUT' in settings).toBeTruthy();
    });

    it('has "appView" property defined', ()=> {
        expect('appView' in settings).toBeTruthy();
    });

    it('has valid "remote" property defined', ()=> {
        expect('remote' in settings).toBeTruthy();
        expect(Object.keys(settings.remote)).toEqual(['ws_host', 'api_host'])
    });

    it('has valid "api" property defined', ()=> {
        expect('api' in settings).toBeTruthy();
        expect(Object.keys(settings.api)).toEqual([
            'timeout', 'cache_time', 'step',
            'offset', 'root', 'auth', 'user',
            'movies', 'search'
        ])
    });

    it('has valid "subs" property defined', ()=> {
        expect('subs' in settings).toBeTruthy();
        expect(Object.keys(settings.subs)).toEqual([
            'available'
        ])
    });
});