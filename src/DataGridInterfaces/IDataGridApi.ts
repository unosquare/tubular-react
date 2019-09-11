import { ColumnModel, IFilterWrapper } from 'tubular-common';

export interface IDataGridApi {
    exportTo: (allRows: boolean, exportFunc: (payload: any[], columns: ColumnModel[]) => void) => void;
    goToPage: (page: number) => void;
    handleFilterChange: (value: IFilterWrapper) => void;
    processRequest: () => void;
    setActiveColumn: (column: ColumnModel) => void;
    setFilter: (value: IFilterWrapper) => void;
    sortColumn: (property: string) => void;
    updateItemPerPage: (itemsPerPage: number) => void;
    updateSearchText: (searchText: string) => void;
}
