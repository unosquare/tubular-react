import { LANG_ES_US } from "../utils/languages/lang-es-us";
import { LANG_EN_US } from "../utils/languages/lang-en";

interface ILangMap {
    "USENGLISH": string;
    "USSPANISH": string;
    [key: string]: string;
};

export class Lang {
    public static translate(key: string, language: string): string {
        if (!language) {
            language = "USENGLISH";
        }

        let text = this.getTextByLanguage(language, key);

        if (!text && language !== "USENGLISH") {
            text = this.getTextByLanguage("USENGLISH", key);
        }

        return text;
    }

    private static getLangDataByCode(langCode: string): any {
        const langMap: ILangMap = {
            "USENGLISH": LANG_EN_US,
            "USSPANISH": LANG_ES_US,
        };
        const data = langMap[langCode];
        return data;
    }

    private static getTextByLanguage(langCode: string, key: string): string {
        let text = "";
        const langData = this.getLangDataByCode(langCode);
        if (langData) {
            text = langData[key];
        }
        return text;
    }
}
