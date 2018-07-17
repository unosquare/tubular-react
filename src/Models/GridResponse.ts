export default class GridResponse {
  public Aggregate: object;
  public Counter: number;
  public CurrentPage: number = 0;
  public FilteredRecordCount: number;
  public Payload: any[];
  public TotalPages: number = 1;
  public TotalRecordCount: number;
  
  constructor(counter: number = 0) {
    this.Counter = isNaN(counter) ? 0 : counter;
  }
}
