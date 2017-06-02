/**
 * Created by gmena on 06-02-17.
 */
import settings from 'backend/settings.js'

describe('Global Settings Object', ()=> {

    it('has loginView property defined', ()=> {
        expect('loginView' in settings).toBeTruthy();
    });

    it('has appView property defined', ()=> {
        expect('appView' in settings).toBeTruthy();
    });

    it('has remote valid property defined', ()=> {
        expect('remote' in settings).toBeTruthy();
        expect(Object.keys(settings.remote)).toEqual(['ws_host', 'api_host'])
    });
});