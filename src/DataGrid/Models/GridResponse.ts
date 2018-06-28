export default class GridResponse {
  public Aggregate: object;
  public FilteredRecordCount: number;
  public Payload: any[];
  public TotalRecordCount: number;

  constructor( options?: any ) {
    this.Aggregate = options.Aggregate;
    this.FilteredRecordCount = options.FilteredRecordCount;
    this.Payload = options.Payload;
    this.TotalRecordCount = options.TotalRecordCount;
  }
}
