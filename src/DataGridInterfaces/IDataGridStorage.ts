import { ColumnModel } from 'tubular-common';

export interface IDataGridStorage {
    setTextSearch: (textSearch: string) => void;
    setPage: (page: number) => void;
    setColumns: (columns: ColumnModel[]) => void;
    getTextSearch: () => string;
    getPage: () => number;
    getColumns: () => ColumnModel[];
}
