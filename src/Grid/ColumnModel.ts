
import IColumnModelOptions from '../../src/Grid/IColumnModelOptions';

export default class ColumnModel {
  public Aggregate: string;
  public DataType: string;
  public Filter: object;
  public Filtering: boolean;
  public IsKey: boolean;
  public Label: string;
  public Name: string;
  public Searchable: boolean;
  public SortDirection: string;
  public SortOrder: number;
  public Sortable: boolean;
  public Visible: boolean;

  constructor( name: string, options?: IColumnModelOptions ) {
    this.Aggregate = options && options.Aggregate || '';
    this.DataType = options && options.DataType || 'string';
    this.Filtering = options && options.Filtering || false;
    this.IsKey = options && options.IsKey || false;
    this.Label = options && options.Label || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2');
    this.Name = name;
    this.Searchable = options && options.Searchable || false;
    this.SortDirection = options && options.SortDirection || 'None';
    this.SortOrder = options && options.SortOrder || -1;
    this.Sortable = options && options.Sortable || false;
    this.Visible = options && options.Visible || true;
  }
}
