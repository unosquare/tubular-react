import * as React from 'react';
import { GridRequest } from 'tubular-common';
import ITubularHttpClient from '../utils/ITubularHttpClient';
import TubularHttpClient from '../utils/TubularHttpClient';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from './IBaseDataSourceState';

const expectedStructureKeys = JSON.stringify([
  'AggregationPayload',
  'Counter',
  'CurrentPage',
  'FilteredRecordCount',
  'Payload',
  'TotalPages',
  'TotalRecordCount']);

const withRemoteDataSource = (
  WrappedComponent: any,
  columns: any,
  request: string | Request | TubularHttpClient,
  itemsPerPage = 10) => {
  return class extends BaseDataSource {
    public setInitialState(value: any): IBaseDataSourceState {
      return {
        ...value,
        columns,
        itemsPerPage
      };
    }

    public getWrappedComponent(): any {
      return WrappedComponent;
    }

    public getAllRecords(gridRequest: GridRequest): Promise<object> {
      const httpCast = request as ITubularHttpClient;
      let httpClient: ITubularHttpClient;

      if (httpCast.request) {
        httpClient = httpCast;
      } else {
        httpClient = new TubularHttpClient(request);
      }

      return httpClient.fetch(gridRequest)
        .then((data) => {
          if (!this.isValidResponse(data)) {
            throw new Error('Server response is a invalid Tubular object');
          }

          data.Payload = data.Payload.map((row: any) => this.parsePayload(row, gridRequest.Columns));
          return data;
        });
    }

    public parsePayload(row: any, c: any[]) {
      return c.reduce((obj: any, column: any, key: any) => {
        obj[column.Name] = row[key] || row[column.Name];

        return obj;
      }, {});
    }

    private isValidResponse(data: any) {
      return data && expectedStructureKeys === JSON.stringify(Object.keys(data).sort());
    }
  };
};

export default withRemoteDataSource;
