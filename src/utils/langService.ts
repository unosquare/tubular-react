import * as english from '../utils/languages/english.json';

const settings = {
    lang: english,
} as {
    [key: string]: any;
};

export default class Lang {
    public static translate(key: string, ...args: any[]): string {
        let text = this.getTextByLanguage(key);
        if (args.length > 0) {
            text = this.formatTranslation(text, args);
        }
        return text;
    }

    private static getTextByLanguage(key: string): string {
        const lang = settings.lang;
        const text = lang[key];
        return text ? text : 'INVALID KEY';
    }

    private static formatTranslation(val: string, args: any[]) {
        return val.replace(new RegExp(`{([0-${args.length - 1}])}`, 'gi'), (_match: string, index: number) => {
            return args[index];
        });
    }
}
