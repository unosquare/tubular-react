import { IDataGridStorage } from 'tubular-common';

export interface IDataGridConfig {
    itemsPerPage: number;
    storage: IDataGridStorage;
    page: number;
    searchText: string;
    gridName: string;

    onError: (error: any) => void;
}
