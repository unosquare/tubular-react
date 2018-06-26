import ColumnModel from '../Models/ColumnModel';

export default interface IBaseDataSourceState {
    aggregate: any;
    data: any[];
    filteredRecordCount: any;
    totalRecordCount: any;
    itemsPerPage: number;
    page: number;
    searchText: any;
    columns: ColumnModel[];
    isLoading: boolean;
    error: any;
}