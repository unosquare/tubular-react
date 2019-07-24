import { IDataGridApi } from './IDataGridApi';
import { IDataGridState } from './IDataGridState';

export interface IDataGrid {
    api: IDataGridApi;
    state: IDataGridState;
}
