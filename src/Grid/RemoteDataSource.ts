import Axios from 'axios';
import * as Rx from 'rx';
import { AggregateFunctions, ColumnDataType, CompareOperators } from './Column';
import ColumnModel from './ColumnModel';
import GridRequest from './GridRequest';
import GridResponse from './GridResponse';

export default class RemoteDataSource implements IDataSource {
  public static defaultColumnValues = {
    Aggregate: AggregateFunctions.NONE,
    DataType: ColumnDataType.STRING,
    IsKey: false,
    Searchable: false,
    Sortable: false,
    Visible: true
  };

  public columns: ColumnModel[];

  public dataStream: any;

  public url: string;

  public counter: number;

  constructor(url: string, columns: ColumnModel[]) {
    this.url = url;
    this.counter = 0;
    this.dataStream = new Rx.BehaviorSubject({ Payload: [] });
    this.columns = this.normalizeColumns(columns);
  }

  public connect(rowsPerPage: number, page: number, searchText: string) {
    this._updateDataStream(rowsPerPage, page, searchText);
    return this.dataStream;
  }

  public refresh(rowsPerPage: number, page: number, searchText: string) {
    this._updateDataStream(rowsPerPage, page, searchText);
  }

  public getAllRecords = (rowsPerPage: number, page: number, searchText: string): Promise<object> =>
  new Promise((resolve, reject) => {
    const request = new GridRequest({
      Columns: this.columns,
      Count: this.counter++,
      Search: { Text: searchText ? searchText : '', Operator: 'Auto' },
      Skip: page * rowsPerPage,
      Take: rowsPerPage,
      TimezoneOffset: 360
    });

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

      resolve(new GridResponse({
        Aggregate: response.data.AggregationPayload,
        FilteredRecordCount: response.data.FilteredRecordCount,
        Payload: rows,
        RowsPerPage: rowsPerPage,
        SearchText: searchText,
        TotalRecordCount: response.data.TotalRecordCount
      }));
    }).catch((error) => {
      reject(error);
    });
  })

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

  public _updateDataStream(rowsPerPage: number, page: number, searchText: string) {
    this.getAllRecords(rowsPerPage, page, searchText)
      .then( (data) => {
        this.dataStream.onNext(data);
      })
      .catch( (e) => {
        this.handleError(e);
      }) ;
  }

  public handleError(error: any) {
    switch (error.response.status) {
      case 400:
        throw new Error('There was a client error');
      case 401:
        throw new Error('Authentication is required');
      case 403:
        throw new Error('Access Denied/Forbidden');
      case 404:
        throw new Error('Keys were not found');
      case 500:
        throw new Error('Internal server error');
      default:
        throw new Error('There was an Error ' + error.response.status );
    }
  }

  private normalizeColumns = (columns: ColumnModel[]) =>
    columns.map((column) => {
      const obj = Object.assign({}, RemoteDataSource.defaultColumnValues, column);
      if (column.Filtering) {
        obj.Filter = {
          Argument: [],
          HasFilter: false,
          Name: obj.Name,
          Operator: CompareOperators.NONE,
          OptionsUrl: null,
          Text: null
        };
      }
      delete obj.Filtering;
      return obj;
    })
}