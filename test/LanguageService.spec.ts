import Lang from '../src/utils/Lang';
import TubularLangDef from '../src/utils/languages/TubularLangDef';

const BadEnglish: TubularLangDef = {
    ClickSort: 'Click to sort. Press Ctrl to sort by multiple columns',
    NoRecords: 'No recordz found',
    Value: 'Value',
    FirstValue: 'First Value',
    SecondValue: 'Second Value',
    None: 'None',
    FirstPage: 'First Page',
    PrevPage: 'Previous Page',
    PageNum: 'Page {0}',
    NextPage: 'Next Page',
    LastPage: 'Last Page',
    Pages: '{0} - {1} of {2}',
    TotalRecords: '{0} to {1} of {2} from {3} records',
    Loading: 'Loading...',
    Download: 'Download',
    Print: 'Print',
    CurrentRows: 'Current rows',
    AllRows: 'All rows',
    Operator: 'Operator',
};

describe('Language service', () => {
    test('Translate text', () => {
        const translation = Lang.translate('NoRecords');
        expect(translation).toEqual('No records found');
    });

    test('Invalid key returns the key', () => {
        const translation = Lang.translate('SomeKey');
        expect(translation).toEqual('SomeKey');
    });

    test('Add language', () => {
        Lang.addLanguage('bad', BadEnglish);
        Lang.changeLanguage('bad');

        const translation = Lang.translate('NoRecords');
        expect(translation).toEqual('No recordz found');
    });
});
