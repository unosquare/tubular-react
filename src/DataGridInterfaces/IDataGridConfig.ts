import { IDataGridStorage } from './IDataGridStorage';

export interface IDataGridConfig {
    itemsPerPage: number;
    storage: IDataGridStorage;
    page: number;
    searchText: string;
    gridName: string;

    onError: (error: any) => void;
}
