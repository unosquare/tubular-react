import Lang from '../src/utils/Lang';

describe('Language service', () => {
    test('Translate text', () => {
        const translation = Lang.translate('NoRecords');
        expect(translation).toEqual('No records found');
    });
    test('Invalid key returns the key', () => {
        const translation = Lang.translate('SomeKey');
        expect(translation).toEqual('SomeKey');
    });
});
