import { AggregateFunctions, ColumnDataType, ColumnSortDirection } from './Column';
import IColumnModelOptions from './IColumnModelOptions';

export default class ColumnModel {
  public Aggregate: AggregateFunctions;
  public DataType: ColumnDataType;
  public Filter: object;
  public Filtering: boolean;
  public IsKey: boolean;
  public Label: string;
  public Name: string;
  public Searchable: boolean;
  public SortDirection: ColumnSortDirection;
  public SortOrder: number;
  public Sortable: boolean;
  public Visible: boolean;

  constructor( name: string, options?: IColumnModelOptions ) {
    this.Aggregate = options && options.Aggregate || AggregateFunctions.NONE;
    this.DataType = options && options.DataType || ColumnDataType.STRING;
    this.Filtering = options && options.Filtering || false;
    this.IsKey = options && options.IsKey || false;
    this.Label = options && options.Label || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2');
    this.Name = name;
    this.Searchable = options && options.Searchable || false;
    this.SortDirection = options && options.SortDirection || ColumnSortDirection.NONE;
    this.SortOrder = options && options.SortDirection !== ColumnSortDirection.NONE && options.SortOrder || -1;
    this.Sortable = options && options.SortDirection ? true : false;
    this.Visible = options && options.Visible || true;
  }
}
