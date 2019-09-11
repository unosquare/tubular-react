import { ColumnModel, IDataGridStorage } from 'tubular-common';

export interface IDataGridState {
    activeColumn: ColumnModel;
    aggregate: any;
    columns: ColumnModel[];
    data: any[];
    error: any;
    filteredRecordCount: number;
    initialized: boolean;
    isLoading: boolean;
    multiSort: boolean;
    itemsPerPage: number;
    page: number;
    searchText: string;
    storage: IDataGridStorage;
    totalRecordCount: number;
}
