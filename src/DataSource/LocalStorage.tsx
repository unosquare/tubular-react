import { ColumnModel } from 'tubular-common';
import { IDataGridStorage } from '../DataGridInterfaces';

export default class LocalStorage implements IDataGridStorage {
    private name: string;

    public constructor(name: string) {
        this.name = name;

        if (!window || !window.localStorage) {
            throw new Error('The localStorage is not present.');
        }
    }

    public setTextSearch(textSearch: string): void {
        window.localStorage.setItem(`${this.name}_textSearch`, textSearch);
    }

    public setPage(page: number): void {
        window.localStorage.setItem(`${this.name}_page`, page.toString());
    }

    public setColumns(columns: ColumnModel[]): void {
        window.localStorage.setItem(`${this.name}_columns`, JSON.stringify(columns));
    }

    public getTextSearch(): string {
        return window.localStorage.getItem(`${this.name}_textSearch`);
    }

    public getPage(): number {
        return parseInt(window.localStorage.getItem(`${this.name}_page`), 10);
    }

    public getColumns(): ColumnModel[] {
        return JSON.parse(window.localStorage.getItem(`${this.name}_columns`));
    }
}
