import { ColumnModel } from 'tubular-common';
import { IDataGridStorage } from './IDataGridStorage';

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
