import { ColumnModel } from 'tubular-common';
import { IDataGridStorage } from './IDataGridStorage';

export interface IDataGridState {
    activeColumn: any;
    aggregate: any;
    columns: ColumnModel[];
    data: any[];
    error: any;
    filteredRecordCount: any;
    initialized: boolean;
    isLoading: boolean;
    multiSort: boolean;
    itemsPerPage: number;
    page: number;
    searchText: any;
    storage: IDataGridStorage;
    totalRecordCount: any;
}
