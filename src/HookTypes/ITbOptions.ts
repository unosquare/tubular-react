import { IDataGridStorage } from 'tubular-common';
import { ITbCallbacks } from './ITbCallbacks';
import { ITbPagination } from './ITbPagination';

export interface ITbOptions {
    componentName?: string;
    deps?: any[];
    pagination?: Partial<ITbPagination>;
    callbacks?: ITbCallbacks;
    storage?: IDataGridStorage;
    searchText?: string;
}
