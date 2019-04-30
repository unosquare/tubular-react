import { ColumnModel } from 'tubular-common';
import { IDataGridStorage } from '../DataGridInterfaces';

export class LocalStorage implements IDataGridStorage {
    private name: string;

    public LocalStorage(name: string) {
        this.name = name;

        if (!window || !window.localStorage) {
            throw new Error('The localStorage is not present.');
        }
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setPage(page: number): void {
        window.localStorage.setItem(`${this.name}_page`, page.toString());
    }

    public setColumns(columns: ColumnModel[]): void {
        window.localStorage.setItem(`${this.name}_columns`, JSON.stringify(columns));
    }

    public getPage(): number {
        return parseInt(window.localStorage.getItem(`${this.name}_page`), 10);
    }

    public getColumns(): ColumnModel[] {
        return JSON.parse(window.localStorage.getItem(`${this.name}_columns`));
    }
}
