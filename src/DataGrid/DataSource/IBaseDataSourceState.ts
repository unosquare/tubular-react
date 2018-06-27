import ColumnModel from '../Models/ColumnModel';

export default interface IBaseDataSourceState {
    aggregate: any;
    columns: ColumnModel[];
    data: any[];
    error: any;
    filteredRecordCount: any;
    isLoading: boolean;
    itemsPerPage: number;
    page: number;
    searchText: any;
    totalRecordCount: any;
}
