import ColumnModel from './ColumnModel';

const currentTimezone = new Date().getTimezoneOffset();

export default class GridRequest {
  protected static counter: number;

  public Columns: ColumnModel[];
  public Count: number;
  public Search: object;
  public Skip: number;
  public Take: number;
  public TimezoneOffset: number;

  constructor(columns: ColumnModel[], rowsPerPage: number, page: number, searchText: string = '') {
    this.Columns = columns;
    this.Search = { Text: searchText, Operator: 'Auto' };
    this.Skip = rowsPerPage === -1 ? 0 : page * rowsPerPage;
    this.Take = rowsPerPage;
    this.Count = GridRequest.counter++;
    this.TimezoneOffset = currentTimezone;
  }
}
