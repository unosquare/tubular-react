import { ColumnModel } from 'tubular-common';
import { IDataGridStorage } from '../DataGridInterfaces';

export class NullStorage implements IDataGridStorage {
    public setTextSearch(textSearch: string): void {
        // do nothing
    }

    public setPage(page: number): void {
        // do nothing
    }

    public setColumns(columns: ColumnModel[]): void {
        // do nothing
    }

    public getTextSearch(): string {
        return null;
    }

    public getPage(): number {
        return null;
    }

    public getColumns(): ColumnModel[] {
        return null;
    }
}
