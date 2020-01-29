import {Lang} from '../src/utils/langService';

describe('Language service', () => {
    test('Translate text', () => {
        var translation = Lang.translate("NoRecords");
        expect(translation).not.toEqual("No se encontraron registros");
    }),
    test('Language change', () => {
        Lang.changeLang('english');
        var translation = Lang.translate("NoRecords");
        expect(translation).toEqual("No records found");
    }),
    test('Invalid key', () => {
        var translation = Lang.translate("SomeKey");
        expect(translation).toEqual("INVALID KEY");
    })
})