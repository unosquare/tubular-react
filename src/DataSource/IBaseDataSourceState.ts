import { ColumnModel } from 'tubular-common';
import IDataGridStorage from '../DataGridInterfaces/IDataGridStorage';

export default interface IBaseDataSourceState {
    activeColumn: any;
    aggregate: any;
    anchorFilter: any;
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
