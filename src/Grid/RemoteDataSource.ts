import Axios from 'axios';
import * as Rx from 'rx';

export default class RemoteDataSource implements IDataSource {
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

  public url: string;

  public counter: number;

  constructor(url: string, columns: any[]) {
    this.url = url;
    this.counter = 0;
    this.dataStream = new Rx.BehaviorSubject({ payload: [] });
    this.columns = this.normalizeColumns(columns);
  }

  public connect(rowsPerPage: number, page: number, searchText: number) {
    this._updateDataStream(rowsPerPage, page, searchText);
    return this.dataStream;
  }

  public refresh(rowsPerPage: number, page: number, searchText: number) {
    this._updateDataStream(rowsPerPage, page, searchText);
  }

  public getAllRecords = (rowsPerPage: number, page: number, searchText: number): Promise<object> =>
  new Promise((resolve, reject) => {
    const request = {
      Columns: this.columns,
      Count: this.counter++,
      Search: { Text: searchText ? searchText : '', Operator: 'Auto' },
      Skip: page * rowsPerPage,
      Take: rowsPerPage,
      TimezoneOffset: 360
    };

    Axios.post(this.url, request).then((response) => {
      if (response.data === undefined || !this.isValidResponse(response.data)) {
        throw new Error('It\'s not a valid Tubular response object');
      }

      const data = response.data.Payload;
      const rows = data.map((row: any) => {
        const obj: any = {};

        this.columns.forEach((column: any, key: any) => {
          obj[column.Name] = row[key] || row[column.Name];
        });

        return obj;
      });

      resolve({
        aggregate: response.data.AggregationPayload,
        filteredRecordCount: response.data.FilteredRecordCount,
        payload: rows,
        rowsPerPage,
        searchText,
        totalRecordCount: response.data.TotalRecordCount
      });
    }).catch((error) => {
      reject(error);
    });
  })

  public handleError(error: any) {
    if (error.status === 404) {
      throw new Error('Keys were not found');
    } else if (error.status === 500) {
      throw new Error('Internal server error');
    }
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

  public _updateDataStream(rowsPerPage: number, page: number, searchText: number) {
    this.getAllRecords(rowsPerPage, page, searchText)
      .then( (data) => {
        this.dataStream.onNext(data);
      })
      .catch( (error) => {
        this.handleError(error);
      }) ;
  }

  private normalizeColumns = (columns: any[]) =>
    columns.map((column) => {
      const obj = Object.assign({}, RemoteDataSource.defaultColumnValues, column);
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
