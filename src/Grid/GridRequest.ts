import ColumnModel from './ColumnModel';

export default class GridRequest {
  public Columns: ColumnModel[];
  public Count: number;
  public Search: object;
  public Skip: number;
  public Take: number;
  public TimezoneOffset: number;

  constructor( options?: any ) {
    this.Columns = options.Columns;
    this.Count = options.Count;
    this.Search = options.Search;
    this.Skip = options.Skip;
    this.Take = options.Take;
    this.TimezoneOffset = options.TimezoneOffset;
  }
}
