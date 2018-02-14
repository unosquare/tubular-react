
import IColumnModel from '../../src/Grid/IColumnModel';

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

  constructor( name: string, params?: IColumnModel ) {
    this.Aggregate = params && params.Aggregate || '';
    this.DataType = params && params.DataType || 'string';
    this.Filtering = params && params.Filtering || false;
    this.IsKey = params && params.IsKey || false;
    this.Label = params && params.Label || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2');
    this.Name = name;
    this.Searchable = params && params.Searchable || false;
    this.SortDirection = params && params.SortDirection || 'None';
    this.SortOrder = params && params.SortOrder || -1;
    this.Sortable = params && params.Sortable || false;
    this.Visible = params && params.Visible || true;
  }
}
