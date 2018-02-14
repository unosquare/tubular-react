import Axios from 'axios';
import * as Rx from 'rx';

export default class LocalDataSource implements IDataSource {

  public static defaultColumnValues = {
    Aggregate: 'None',
    DataType: 'string',
    IsKey: false,
    Searchable: false,
    Sortable: false,
    Visible: true
  };

  public columns: any[];
  public dataStream: any;
  public localData: any[];

  constructor(localData: any[], columns: any[]) {
    this.localData = localData;
    this.dataStream = new Rx.BehaviorSubject({ payload: [] });
    this.columns = this.normalizeColumns(columns);
  }

  public connect(rowsPerPage: number, page: number, searchText: number) {
    this._updateDataStream();
    return this.dataStream;
  }

  public refresh() {
    this._updateDataStream();
  }

  public getAllRecords = (): Promise<object> =>
    new Promise((resolve, reject) => {
      const data = this.localData;

      const rows = data.map((row: any) => {
        const obj: any = {};

        this.columns.forEach((column: any, key: any) => {
          obj[column.Name] = row[key] || row[column.Name];
        });

        return obj;
      });

      resolve({
        payload: rows
      });
    })

  public handleError(error: any) {
    throw new Error(`Something wrong happened: ${error}`);
  }

  public isValidResponse(response: object) {
    const expectedStructure: any = {
      AggregationPayload: null,
      Counter: null,
      CurrentPage: null,
      FilteredRecordCount: null,
      Payload: null,
      TotalPages: null,
      TotalRecordCount: null
    };

    const expectedStructureKeys = Object.keys(expectedStructure).sort();
    const responseKeys = Object.keys(response).sort();

    return JSON.stringify(expectedStructureKeys) === JSON.stringify(responseKeys);
  }

  public _updateDataStream() {
    this.getAllRecords()
      .then((data) => {
        this.dataStream.onNext(data);
      }).catch((error) => {
        this.handleError(error);
      });
  }

  private normalizeColumns = (columns: any[]) =>
    columns.map((column) => {
      const obj = Object.assign({}, LocalDataSource.defaultColumnValues, column);

      if (column.Filtering) {
        obj.Filter = {
          Argument: [],
          HasFilter: false,
          Name: obj.Name,
          Operator: 'None',
          OptionsUrl: null,
          Text: null
        };
      }
      delete obj.Filtering;

      return obj;
    })
}
