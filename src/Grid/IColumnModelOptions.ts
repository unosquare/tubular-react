import { AggregateFunctions, ColumnDataType, ColumnSortDirection } from './Column';

export default interface IColumnModelOptions {
    Aggregate?: AggregateFunctions;
    DataType?: ColumnDataType;
    Filtering?: boolean;
    IsKey?: boolean;
    Label?: string;
    Searchable?: boolean;
    SortDirection?: ColumnSortDirection;
    SortOrder?: number;
    Sortable?: boolean;
    Visible?: boolean;
}
