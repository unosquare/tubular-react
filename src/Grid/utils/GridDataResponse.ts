export default class GridDataResponse {

  public Counter: number;
  public Payload: any[];
  public TotalRecordCount: number;
  public FilteredRecordCount: number;
  public TotalPages: number;
  public CurrentPage: number;
  public AggregationPayload: object;

  constructor(args: any) {
    this.Counter = 0;
    this.Payload = [];
    this.TotalRecordCount = 0;
    this.FilteredRecordCount = 0;
    this.TotalPages = 0;
    this.CurrentPage = 0;
    this.AggregationPayload = {};

    Object.assign(this, args);
  }
}
