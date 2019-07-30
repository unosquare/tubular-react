export interface IDataGridApi {
    exportTo: (allRows: boolean, exportFunc: any) => void;
    goToPage: (page: number) => void;
    handleFilterChange: (value: any) => void;
    processRequest: () => void;
    setActiveColumn: (column: any, event: React.MouseEvent<HTMLElement>) => void;
    setFilter: (value: any) => void;
    sortColumn: (property: string) => void;
    updateItemPerPage: (itemsPerPage: number) => void;
    updateSearchText: (searchText: string) => void;
}
