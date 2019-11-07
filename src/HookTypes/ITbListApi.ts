
export interface ITbListApi {
    loadPage: (page: number) => void;
    search: (value: string) => void;
    sortByColumn: (columnName: string) => void;
}
