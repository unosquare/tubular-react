import { ColumnModel } from 'tubular-common';

export default interface IBaseDataSourceState {
    activeColumn: any;
    aggregate: any;
    anchorFilter: any;
    columns: ColumnModel[];
    data: any[];
    error: any;
    filteredRecordCount: any;
    isLoading: boolean;
    multiSort: boolean;
    itemsPerPage: number;
    page: number;
    searchText: any;
    totalRecordCount: any;
}
