import { ColumnModel, IDataGridStorage } from 'tubular-common';

export interface ITbState {
    activeColumn: ColumnModel;
    aggregate: any;
    columns: ColumnModel[];
    data: any[];
    error: any;
    filteredRecordCount: number;
    initialized: boolean;
    isLoading: boolean;
    itemsPerPage: number;
    page: number;
    searchText: string;
    storage: IDataGridStorage;
    totalRecordCount: number;
}
