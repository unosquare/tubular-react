import ColumnModel from './ColumnModel';

const currentTimezone = new Date().getTimezoneOffset();

export default class GridRequest {
  protected static counter: number = 0;

  public Columns: ColumnModel[];
  public Counter : number;
  public Search: object;
  public Skip: number;
  public Take: number;
  public TimezoneOffset: number;

  constructor(columns: ColumnModel[], itemsPerPage: number, page: number, searchText: string = '') {
    this.Columns = columns;
    this.Search = { Text: searchText, Operator: 'Auto' };
    this.Skip = itemsPerPage === -1 ? 0 : page * itemsPerPage;
    this.Take = itemsPerPage;
    this.Counter = GridRequest.counter++;
    this.TimezoneOffset = currentTimezone;
  }
}
