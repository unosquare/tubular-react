import Axios from 'axios';
import * as Rx from 'rx';
import { AggregateFunctions, ColumnDataType, CompareOperators } from './Column';
import ColumnModel from './ColumnModel';
import GridRequest from './GridRequest';
import GridResponse from './GridResponse';
import BaseDataSource from './BaseDataSource';

export default class RemoteDataSource extends BaseDataSource {

  public url: string;

  constructor(url: string, columns: ColumnModel[]) {
    super(columns);
    this.url = url;
  }

  public getAllRecords(rowsPerPage: number, page: number, searchText: string): Promise<object> {
    return new Promise((resolve, reject) => {
      const request = new GridRequest({
        Columns: this.columns,
        Count: BaseDataSource.counter++,
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
    });
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
}
