import TubularLangDef from './languages/TubularLangDef';
import English from './languages/English';

const formatTranslation = (val: string, args: any[]) =>
    val.replace(new RegExp(`{([0-${args.length - 1}])}`, 'gi'), (_, index) => args[index]);

export class LangBase<T> {
    private data: any = {};
    private currentLanguage: string;

    constructor(langKey: string, initialLanguage: T) {
        this.data[langKey] = initialLanguage;
        this.currentLanguage = langKey;
    }

    public translate(key: string, ...args: any[]): string {
        const text = this.data[this.currentLanguage][key];

        if (!text) return key;

        return args.length > 0 ? formatTranslation(text, args) : text;
    }

    public changeLanguage(langKey: string) {
        this.currentLanguage = langKey;
    }
}

export class LangDefault extends LangBase<TubularLangDef> {
    constructor() {
        super('en', English);
    }
}

const Lang = new LangDefault();

export default Lang;
