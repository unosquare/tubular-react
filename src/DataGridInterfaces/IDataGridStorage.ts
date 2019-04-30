import { ColumnModel } from 'tubular-common';

export default interface IDataGridStorage {
    setName: (name: string) => void;
    setPage: (page: number) => void;
    setColumns: (columns: ColumnModel[]) => void;
    getPage: () => number;
    getColumns: () => ColumnModel[];
}
