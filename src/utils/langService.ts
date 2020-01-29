import * as english from '../utils/languages/english.json';
import * as spanish from '../utils/languages/spanish.json';

const settings = { langName: 'english' };

export default class Lang {
    public static changeLang(lang: string) {
        settings.langName = lang || lang.length > 0 ? lang : 'english';
    }

    public static translate(key: string, ...args: any[]): string {
        let text = this.getTextByLanguage(key);
        if (args.length > 0) {
            text = this.formatTranslation(text, args);
        }
        return text;
    }

    private static getLangDataByCode(): any {
        switch (settings.langName) {
            case 'spanish':
                return spanish;
            default:
                return english;
        }
    }

    private static getTextByLanguage(key: string): string {
        const langData = this.getLangDataByCode();
        const text = langData[key];
        return text ? text : 'INVALID KEY';
    }

    private static formatTranslation(val: string, args: any[]) {
        return val.replace(new RegExp(`{([0-${args.length - 1}])}`, 'gi'), (_match: string, index: number) => {
            return args[index];
        });
    }
}
