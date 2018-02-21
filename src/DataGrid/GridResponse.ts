import ColumnModel from './ColumnModel';

export default class GridResponse {
  public Aggregate: object;
  public FilteredRecordCount: number;
  public Payload: any[];
  public RowsPerPage: number;
  public SearchText: string;
  public TotalRecordCount: number;

  constructor( options?: any ) {
    this.Aggregate = options.Aggregate;
    this.FilteredRecordCount = options.FilteredRecordCount;
    this.Payload = options.Payload;
    this.RowsPerPage = options.RowsPerPage;
    this.SearchText = options.SearchText;
    this.TotalRecordCount = options.TotalRecordCount;
  }
}
