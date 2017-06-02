/**
 * Created by gmena on 06-02-17.
 */
import isjs from 'is_js'
import settings from 'backend/settings.js'

describe('Global Settings Object', ()=> {

    it('has valid "loginView" property defined', ()=> {
        expect('loginView' in settings).toBeTruthy();
        expect(isjs.string(settings.loginView)).toBe(true, 'string value needed');
    });

    it('has valid "appView" property defined', ()=> {
        expect('appView' in settings).toBeTruthy();
        expect(isjs.string(settings.appView)).toBe(true, 'string value needed');
    });

    it('has valid "remote" property defined', ()=> {
        expect('remote' in settings).toBeTruthy();
        expect(Object.keys(settings.remote)).toEqual(['ws_host', 'api_host']);
    });

    it('has valid "remote.api_host" property defined', ()=> {
        expect(isjs.url(settings.remote.api_host)).toBe(true, 'valid http url is needed')
    });

    it('has valid "remote.ws_host" property defined', ()=> {
        expect(isjs.string(settings.remote.ws_host)).toBe(true, 'string value needed');
        expect(settings.remote.ws_host.slice(0, 5)).toBe('ws://', 'valid ws server url needed');
    });

    it('has valid "api" property defined', ()=> {
        expect('api' in settings).toBeTruthy();
        expect(Object.keys(settings.api)).toEqual([
            'timeout', 'cache_time', 'step',
            'offset', 'root', 'auth', 'user',
            'movies', 'search'
        ])
    });

    (function (settings) {
        let _attr = Object.keys(settings);
        for (let x in _attr) {
            if ((~['offset', 'step', 'cache_time', 'timeout'].indexOf(_attr[x]))) {
                it('has valid "api.' + _attr[x] + '" defined', ()=> {
                    expect(
                        isjs.number(settings[_attr[x]])
                        && settings[_attr[x]] > 0
                    ).toBe(true, 'greater than 0 valid "' + _attr[x] + '" number needed')
                });
            }
        }
    })(settings.api);


    (function (settings) {
        let _attr = ['root', 'auth', 'user', 'movies', 'search'];
        for (let x in _attr) {
            it('has valid "api.' + _attr[x] + '" defined', ()=> {
                expect(_attr[x] in settings).toBe(true, 'valid "' + _attr[x] + '" property needed');
                expect(isjs.url(settings[_attr[x]]))
                    .toBe(true, 'valid http url "' + _attr[x] + '" needed')
            });

        }
    })(settings.api);


    it('has valid "subs" property defined', ()=> {
        expect('subs' in settings).toBe(true, 'valid "subs" property needed');
        expect(Object.keys(settings.subs)).toEqual([
            'available'
        ])
    });

    it('has valid "subs.available" property defined', ()=> {
        expect(
            isjs.array(settings.subs.available)
        ).toBe(true, 'valid "available" array needed')
    });
});